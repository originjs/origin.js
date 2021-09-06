## File-based Routing
Routes will be updated by tracking the file created in this dir.

### Usage
1. Normal file name: /user/foo.vue -> /user/foo
2. File name starts with `_`: /user/_id.vue -> /user/:id
3. File name is `index.vue`: /user/index.vue -> /user
4. File name is `_`: /_.vue -> /:pathMatch(.*)*

### Others
1. The name of files and directories in same directory must be different.
   For example, if we already have /user/, we can't add a `user.vue` file.
2. Directory can not be `index`

<!-- TODO: npm source link -->