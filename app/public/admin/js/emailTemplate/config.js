import edit_button from '../edit_button.html';

export default function (nga, admin) {
    var emailTemplate = admin.getEntity('EmailTemplate');

    emailTemplate.listView()
        .title('<h4>Email Template <i class="fa fa-angle-right" aria-hidden="true"></i> List</h4>')
        .listActions(['edit','delete'])
        .batchActions([])
        .fields([
            nga.field('id')
                .label('Template ID'),//this label is template id not only id for UI purpose
            nga.field('template_id', 'choice')
                .choices([
                    { value: 'code-pin-email', label: 'Email Template for Forgot Pin' },
                    { value: 'new-account', label: 'Email Template for New Account' },
                    { value: 'new-email', label: 'Email Template for New Email' },
                    { value: 'reset-password-email', label: 'Email Template for Reset Password' },
                    { value: 'weather-widget', label: 'Weather Widget' },
                    { value: 'invoice-info', label: 'Invoice Information' },
                    { value: 'user-invite-email', label: 'User Invite Email' },
                    { value: 'reset-password-email-device', label: 'Device Reset Password Email' }
                    // { value: 'reset-password-email', label: '' },
                    // { value: 'reset-password-enter-password', label: '' },
                    // { value: 'salesreport-invoice', label: '' },
                ])
                .label('Description'),//this label is Description not template id for UI purpose
            nga.field('title', 'string')
                .label('Title'),
            nga.field('language', 'string')
                .label('Language')
        ]);

    emailTemplate.creationView()
        .title('<h4>Email Template <i class="fa fa-angle-right" aria-hidden="true"></i> Create: Template</h4>')
        .fields([
            nga.field('template_id', 'choice')
                .attributes({ placeholder: 'Choose from dropdown list' })
                .choices([
                    { value: 'code-pin-email', label: 'Email Template for Forgot Pin' },
                    { value: 'new-account', label: 'Email Template for New Account' },
                    { value: 'new-email', label: 'Email Template for New Email' },
                    { value: 'reset-password-email', label: 'Email Template for Reset Password' },
                    { value: 'weather-widget', label: 'Weather Widget' },
                    { value: 'invoice-info', label: 'Invoice Information' },
                    { value: 'user-invite-email', label: 'User Invite Email' },
                    { value: 'reset-password-email-device', label: 'Device Reset Password Email' }
                  // { value: 'reset-password-confirm-email', label: '' },
                    // { value: 'reset-password-email', label: '' },
                    // { value: 'reset-password-enter-password', label: '' },
                    // { value: 'salesreport-invoice', label: '' },
                ])
                .validation({required: true})
                .label('Description'),//this label is Description not template id for UI purpose
            nga.field('title', 'string')
                .attributes({ placeholder: 'Title' })
                .validation({ required: true })
                .label('Title'),
            nga.field('language', 'choice')
                .attributes({ placeholder: 'Choose from dropdown list' })
                .choices([
                    { value: 'eng', label: 'English' },
                    { value: 'fre', label: 'French' },
                    { value: 'spa', label: 'Spanish' },
                    { value: 'sqi', label: 'Albanian' },
                    { value: 'pt', label: 'Portuguese' }
                ])
                .validation({ required: true })
                .label('Language'),
            nga.field('content', 'text')
                .attributes({ placeholder: 'Content' })
                .validation({ required: true })
                .label('Content'),

            //used only for information purpose , no effect on backend
            nga.field('template_info')
                .label('')
                .template(
                    '<div  ng-if="entry.values.template_id === \'code-pin-email\'">' +
                        '<p><span>&#123;&#123;</span><span>result.firstname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>result.lastname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>req.thisuser.pin</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Pin</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'new-account\'">' +
                        '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname and Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                        '<p><span>&#123;&#123;</span><span>Url</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Confirmation Url</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'new-email\'">' +
                        '<p><span>&#123;&#123;</span><span>customer_data.firstname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>customer_data.lastname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>req.body.email</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = New Email</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'reset-password-email\'">' +
                    '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname and Lastname</span></p>' +
                    '<p><span>&#123;&#123;</span><span>username</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Username</span></p>' +
                    '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                    '<p><span>&#123;&#123;</span><span>password</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Password</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'reset-password-email-device\'">' +
                        '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Full Name</span></p>' +
                        '<p><span>&#123;&#123;</span><span>username</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Username</span></p>' +
                        '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                        '<p><span>&#123;&#123;</span><span>link</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Password Reset Link</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'user-invite-email\'">' +
                        '<p><span>&#123;&#123;</span><span>link</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Confirmation Link</span></p>' +
                    '</div>'
                ),
            //./used only for information purpose , no effect on backend

            nga.field('template')
                .label('')
                .template(edit_button)
        ]);


    emailTemplate.editionView()
        .actions(['list'])
        .title('<h4>Email Template <i class="fa fa-angle-right" aria-hidden="true"></i> Edit: {{ entry.values.id }}</h4>')
        .fields([
            nga.field('template_id', 'choice')
                .attributes({ placeholder: 'Choose from dropdown list' })
                .choices([
                    { value: 'code-pin-email', label: 'Email Template for Forgot Pin' },
                    { value: 'new-account', label: 'Email Template for New Account' },
                    { value: 'new-email', label: 'Email Template for New Email' },
                    { value: 'reset-password-email', label: 'Email Template for Reset Password' },
                    { value: 'weather-widget', label: 'Weather Widget' },
                    { value: 'invoice-info', label: 'Invoice Information' },
                    { value: 'user-invite-email', label: 'User Invite Email' },
                    { value: 'reset-password-email-device', label: 'Device Reset Password Email' }
                  // { value: 'reset-password-confirm-email', label: '' },
                    // { value: 'reset-password-email', label: '' },
                    // { value: 'reset-password-enter-password', label: '' },
                    // { value: 'salesreport-invoice', label: '' },
                ])
                .validation({required: true})
                .label('Description'),//this label is Description not template id for UI purpose
            nga.field('title', 'string')
                .attributes({ placeholder: 'Title' })
                .validation({ required: true })
                .label('Title'),
            nga.field('language', 'choice')
                .attributes({ placeholder: 'Choose from dropdown list' })
                .choices([
                    { value: 'eng', label: 'English' },
                    { value: 'fre', label: 'French' },
                    { value: 'spa', label: 'Spanish' },
                    { value: 'sqi', label: 'Albanian' },
                    { value: 'pt', label: 'Portuguese' }
                ])
                .validation({ required: true })
                .label('Language'),
            nga.field('content', 'text')
                .attributes({ placeholder: 'Content' })
                .validation({ required: true })
                .label('Content'),

            //used only for information purpose , no effect on backend
            nga.field('template_info')
                .label('')
                .template(
                    '<div  ng-if="entry.values.template_id === \'code-pin-email\'">' +
                        '<p><span>&#123;&#123;</span><span>result.firstname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>result.lastname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>req.thisuser.pin</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Pin</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'new-account\'">' +
                        '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname and Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                        '<p><span>&#123;&#123;</span><span>Url</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Confirmation Url</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'new-email\'">' +
                        '<p><span>&#123;&#123;</span><span>customer_data.firstname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>customer_data.lastname</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>req.body.email</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = New Email</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'reset-password-email\'">' +
                        '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Firstname and Lastname</span></p>' +
                        '<p><span>&#123;&#123;</span><span>username</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Username</span></p>' +
                        '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                        '<p><span>&#123;&#123;</span><span>password</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Password</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'reset-password-email-device\'">' +
                    '<p><span>&#123;&#123;</span><span>name</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Full Name</span></p>' +
                    '<p><span>&#123;&#123;</span><span>username</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Username</span></p>' +
                    '<p><span>&#123;&#123;</span><span>appName</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Company Name</span></p>' +
                    '<p><span>&#123;&#123;</span><span>link</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Password Reset Link</span></p>' +
                    '</div>'+
                    '<div  ng-if="entry.values.template_id === \'user-invite-email\'">' +
                        '<p><span>&#123;&#123;</span><span>link</span><span>&#125;&#125;</span><span style="font-weight: bold;"> = Confirmation Link</span></p>' +
                    '</div>'
                ),
            //./used only for information purpose , no effect on backend

            nga.field('template')
                .label('')
                .template(edit_button)
        ]);

    emailTemplate.deletionView()
        .title('<h4>Email Template <i class="fa fa-angle-right" aria-hidden="true"></i> Remove <span style ="color:red;"> {{ entry.values.id }}')
        .actions(['<ma-back-button entry="entry" entity="entity"></ma-back-button>'])

    return emailTemplate;

}