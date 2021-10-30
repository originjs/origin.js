## Pages
Routes will be configured automatically according to pages.<br/>
Powered by [@originjs/vite-plugin-pages](https://github.com/originjs/origin.js/tree/main/packages/vite-plugin-pages).

### Convert rules
1. Normal file name: /user/foo.vue -> /user/foo
2. File name starts with `_`: /user/_id.vue -> /user/:id
3. File name is `index.vue`: /user/index.vue -> /user
4. File name is `_`: /_.vue -> /:pathMatch(.*)*

### Others
1. The name of files and directories in same directory must be different.
   For example, if we already have /user/, we can't add a `user.vue` file.
2. Directory can not be `index`
