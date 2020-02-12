'use strict'

var path = require('path'),
    schedule = require(path.resolve("./modules/deviceapiv2/server/controllers/schedule.server.controller.js")),
    db = require(path.resolve('./config/lib/sequelize')).models,
    dateFormat = require('dateformat');

exports.getChannelEpg = function (companyId, customerId, channelNumber, intervalStart, intervalEnd, timezone, limit, fill) {
    return new Promise(function (resolve, reject) {
        if (!timezone) {
            timezone = '0'
        }
        
        let hoursOffset = parseInt(timezone);
        db.channels.findOne({
            where: { company_id: companyId, channel_number: channelNumber }
        }).then(function (channel) {
            if (!channel) {
                reject({ code: 404, message: 'Channel not found' });
                return
            }

            db.epg_data.findAll({
                attributes: ['id', 'title', 'short_description', 'short_name', 'duration_seconds', 'program_start', 'program_end', 'long_description'],
                where: {
                    company_id: companyId,
                    program_start: {
                        $lte: intervalEnd
                    },
                    program_end: {
                        $and: [
                            {$lte: intervalEnd},
                            {$gte: intervalStart}
                        ]
                    }
                },
                order: [['program_start', 'ASC']],
                limit: limit,
                include: [
                    {
                        model: db.channels, required: true, attributes: ['title', 'channel_number'],
                        where: { channel_number: channelNumber } //limit data only for this channel
                    },
                    {
                        model: db.program_schedule,
                        required: false, //left join
                        attributes: ['id'],
                        where: { login_id: customerId }
                    }
                ],
            }).then(function (epgs) {
                let programs = []

                if (!epgs) {
                    if (fill) {
                        generateNoEpg(channelNumber, channel.title, limit, programs)
                    }
                    resolve(programs);
                    return;
                }

                epgs.forEach(epg => {
                    //apply timezone
                    let programStart = new Date(epg.program_start).setHours(epg.program_start.getHours() + hoursOffset);
                    let programEnd = new Date(epg.program_end).setHours(epg.program_end.getHours() + hoursOffset);
                    let scheduled = (!epg.program_schedules[0]) ? false : schedule.is_scheduled(epg.program_schedules[0].id);
                    let program = {
                        id: epg.id,
                        channelName: epg.channel.title,
                        number: epg.channel.channel_number,
                        title: epg.title,
                        scheduled: scheduled,
                        description: epg.long_description,
                        shortname: epg.short_description,
                        programstart: dateFormat(programStart, 'UTC:mm/dd/yyyy HH:MM:ss'), //add timezone offset to program_start timestamp, format it as M/D/Y H:m:s
                        programend: dateFormat(programEnd, 'UTC:mm/dd/yyyy HH:MM:ss'), //add timezone offset to program_start timestamp, format it as M/D/Y H:m:s
                        duration: epg.duration_seconds,
                        progress: Math.round((Date.now() - epg.program_start.getTime() ) * 100 / (epg.program_end.getTime() - epg.program_start.getTime()))
                    }
                    programs.push(program)
                });
                if (fill && programs.length < limit) {
                    generateNoEpg(channelNumber, channel.title, limit, programs)
                }
                resolve(programs);
            });
        });
    });
}


function generateNoEpg(channelNumber, channelTitle, limit, guides) {
    let number = limit - guides.length;
    for(let i = 0; i < number; i++) {
        let program = {
            id: -1,
            channelName: channelTitle,
            number: channelNumber,
            title: 'Programs of ' + channelTitle,
            scheduled: false,
            description: 'Programs of ' + channelTitle,
            shortname: 'Programs of ' + channelTitle,
            programstart: '01/01/1970 00:00:00', //add timezone offset to program_start timestamp, format it as M/D/Y H:m:s
            programend: '01/01/1970 00:00:00', //add timezone offset to program_start timestamp, format it as M/D/Y H:m:s
            duration: 0,
            progress: 0
        }

        guides.push(program)
    }
}