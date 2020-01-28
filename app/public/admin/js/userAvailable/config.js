import edit_button from '../edit_button.html';

export default function (nga, admin) {
    var users = admin.getEntity('userAvailable');
    users.listView()
        .title('<h4>Users <i class="fa fa-angle-right" aria-hidden="true"></i> List</h4>')
        .batchActions([])
        .actions(['<roles post="entry"></roles>', 'filter', 'export', '<invite type="invite_users" selection="selection"></invite>'])
        .fields([
            nga.field('username', 'string')
                .label('Username')
        ])
        .listActions(['edit', '<approve-invitation size="xs" review="entry"></approve-invitation>'])
        .exportFields([
            users.listView().fields(),
        ]);


    users.creationView()
        .title('<h4>Users <i class="fa fa-angle-right" aria-hidden="true"></i> Create: User </h4>')
        .fields([
            nga.field('username', 'string')
                .attributes({placeholder: 'Username must be at least 3 character long'})
                .validation({required: true, minlength: 3})
                .label('Username'),
        ])

    return users;

}