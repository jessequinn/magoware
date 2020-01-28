import edit_button from '../../edit_button.html';

export default function (nga, admin) {
    var assetsCategory = admin.getEntity('assetsCategory');

    assetsCategory.listView()
        .title('<h4>Assets Category <i class="fa fa-angle-right" aria-hidden="true"></i> List</h4>')
        .listActions(['edit','delete'])
        .batchActions([])
        .fields([
            nga.field('assets_master_id','reference')
                .targetEntity(admin.getEntity('assetsMaster'))
                .targetField(nga.field('title'))
                .isDetailLink(true)
                .label('Assets Master'),
            nga.field('title','string')
                .label('Title'),
            nga.field('description','text')
                .map(function truncate(value) {
                    if (!value) return '';
                    return value.length > 80 ? value.substr(0, 80) + '...' : value;
                })
                .label('Description'),
            nga.field('api_url','string')
                .label('Api Url'),
            nga.field('image_url')
                .template('<img src="{{ entry.values.image_url }}" height="35" width="35" />')
                .label('Image'),
            nga.field('order','number')
                .label('Order'),
            nga.field('isavailable','boolean')
                .label('Is Available')
        ]);

    assetsCategory.deletionView()
        .title('<h4>Assets Category <i class="fa fa-angle-right" aria-hidden="true"></i> Remove <span style ="color:red;"> {{ entry.values.title }} </span></h4>')
        .actions(['<ma-back-button entry="entry" entity="entity"></ma-back-button>'])


    assetsCategory.creationView()
        .title('<h4>Assets Category <i class="fa fa-angle-right" aria-hidden="true"></i> Create: Assets</h4>')
        .fields([
            nga.field('assets_master_id','reference')
                .targetEntity(admin.getEntity('assetsMaster'))
                .targetField(nga.field('title'))
                .label('Assets Master'),
            nga.field('title','string')
                .attributes({ placeholder: 'Asset Title' })
                .validation({ required: true })
                .label('Title'),
            nga.field('description','text')
                .attributes({ placeholder: 'Specify information you need for the asset' })
                .validation({ required: true })
                .label('Description'),
            nga.field('api_url','string')
                .attributes({ placeholder: 'Api Url' })
                .validation({ required: true })
                .label('Api Url'),

            nga.field('image_url','file')
                .uploadInformation({ 'url': '/file-upload/single-file/hospitalityAssets/image_url','apifilename': 'result'})
                .template('<div class="row">'+
                    '<div class="col-xs-12 col-sm-1"><img src="{{ entry.values.image_url }}" height="40" width="40" /></div>'+
                    '<div class="col-xs-12 col-sm-8"><ma-file-field field="field" value="entry.values.image_url"></ma-file-field></div>'+
                    '</div>'+
                    '<div class="row"><small id="emailHelp" class="form-text text-muted">Not larger than 600 KB</small></div>')
                .validation({
                    validator: function(value) {
                        if (value == null) {
                            throw new Error('Please, choose image');
                        }else {
                            var image_url = document.getElementById('image_url');
                            if (image_url.value.length > 0) {
                                if(image_url.files[0].size > 614400 ){
                                    throw new Error('Your Image is too Big, not larger than 600 KB');
                                }
                            }
                        }
                    }
                })
                .label('Image *'),
            nga.field('order','number')
                .attributes({ placeholder: 'Order' })
                .validation({ required: true })
                .label('Order'),
            nga.field('isavailable','boolean')
                .attributes({ placeholder: 'Is Available' })
                .validation({ required: true })
                .label('Is Available'),
            nga.field('template')
                .label('')
                .template(edit_button)
        ]);

    assetsCategory.editionView()
        .title('<h4>Assets Category <i class="fa fa-angle-right" aria-hidden="true"></i> Edit: {{ entry.values.title }}</h4>')
        .actions(['list'])
        .fields([
            assetsCategory.creationView().fields(),
            nga.field('assetsDetails', 'referenced_list')
                .label('Accets Details')
                .targetEntity(admin.getEntity('assetsDetails'))
                .targetReferenceField('id')
                .targetFields([
                    nga.field('title','string')
                        .label('Title'),
                    nga.field('short_description','text')
                        .map(function truncate(value) {
                            if (!value) return '';
                            return value.length > 80 ? value.substr(0, 80) + '...' : value;
                        })
                        .label('Short Description'),
                    nga.field('icon_url')
                        .template('<img src="{{ entry.values.icon_url }}" height="35" width="35" />')
                        .label('Icon'),
                    nga.field('image_url')
                        .template('<img src="{{ entry.values.image_url }}" height="35" width="35" />')
                        .label('Image'),
                    nga.field('rating','number')
                        .label('Rating'),
                    nga.field('price','number')
                        .label('Price'),

                ])
                .listActions(['edit', 'delete']),
            nga.field('template')
                .label('')
                .template('<ma-create-button entity-name="assetsDetails" class="pull-right" label="ADD DETAILS" default-values="{ assets_category_id: entry.values.id }"></ma-create-button>'),
        ]);


    return assetsCategory;

}