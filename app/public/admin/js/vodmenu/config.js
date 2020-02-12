import edit_button from '../edit_button.html';
import modalImageUpload from "../../templates/modalImageUpload.html";

export default function (nga, admin) {
    var VodMenu = admin.getEntity('vodMenu');

    VodMenu.listView()
        .title('<h4>Vod Menu <i class="fa fa-angle-right" aria-hidden="true"></i> List</h4>')
        .batchActions([])
        .actions(['create'])
        .fields([
          nga.field('id')
            .label('ID'),
          nga.field('name', 'string')
            .label('Vod Menu Name'),
          nga.field('order', 'number')
            .label('Order'),
          nga.field('icon_url', 'file')
            .template(`<div ng-controller="modalController">
                         <img ng-src="{{ entry.values.icon_url }}"
                         width="45"
                         height="45"
                         ng-click="openModalImage(entry.values.icon_url)">
                       </div>`)
            .cssClasses('hidden-xs')
            .label('Icon'),
          nga.field('pin_protected', 'boolean')
            .label('Pin Protected'),
          nga.field('isavailable', 'boolean')
            .label('Available')
        ])
        .listActions(['edit','delete']);

    VodMenu.creationView()
        .title('<h4>Vod Menu <i class="fa fa-angle-right" aria-hidden="true"></i> Create: {{ entry.values.id }}</h4>')
        .fields([
          nga.field('name', 'string')
            .attributes({placeholder: 'Vod Menu Name'})
            .validation({required: true})
            .label('Vod Menu Name'),
          nga.field('description', 'text')
            .transform(function lineBreaks(value, entry) {
              return value.split("\n").join("<br/>");
            })
            .attributes({placeholder: 'Description'})
            .validation({required: true})
            .label('Description'),
          nga.field('order', 'number')
            .attributes({placeholder: 'Order'})
            .validation({required: true})
            .label('Order'),
          nga.field('icon_url', 'file')
            .uploadInformation({'url': '/file-upload/single-file/vodMenu/icon_url', 'apifilename': 'result'})
            .template(modalImageUpload)
            .validation({
              validator: function (value) {
                const icon_url = document.getElementById('icon_url');
                if (icon_url.value.length > 0) {
                  if (icon_url.files[0].size > 614400) {
                    throw new Error('Your Icon is too Big, not larger than 600 KB');
                  }
                }
              }
            })
            .label('Icon'),
          nga.field('pin_protected', 'boolean')
            .attributes({placeholder: 'Pin Protected'})
            .validation({required: true})
            .label('Pin Protected'),
          nga.field('isavailable', 'boolean')
            .attributes({placeholder: 'Is Available'})
            .validation({required: true})
            .label('Is Available'),


          nga.field('template')
            .label('')
            .template(edit_button)
        ]);


    VodMenu.editionView()
        .actions(['list'])
        .title('<h4>Vod Menu <i class="fa fa-angle-right" aria-hidden="true"></i> Edit: {{ entry.values.id }}</h4>')
        .fields([
            VodMenu.creationView().fields(),

            nga.field('vodMenuCarousel', 'referenced_list')
                .label('VOD Menu Carousel')
                .targetEntity(admin.getEntity('vodMenuCarousel'))
                .targetReferenceField('vod_menu_id')
                .targetFields([
                    nga.field('name')
                        .label('Carousel Name'),
                    nga.field('order')
                        .label('Order'),
                    nga.field('url')
                        .label('Url')
                ])
                .listActions(['edit', 'delete']),
            nga.field('Add VOD Menu Carousel', 'template')
                .label('')
                .template('<ma-create-button entity-name="vodMenuCarousel" class="pull-right" label="Add VOD Menu Carousel" default-values="{ vod_menu_id: entry.values.id }"></ma-create-button>'),

        ]);

    VodMenu.deletionView()
        .title('<h4>Vod Menu <i class="fa fa-angle-right" aria-hidden="true"></i> Remove <span style ="color:red;"> {{ entry.values.id }}')
        .actions(['<ma-back-button entry="entry" entity="entity"></ma-back-button>'])

    return VodMenu;

}