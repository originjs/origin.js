## Convert rules
See these examples
1. Normal file name: /user/foo.vue -> /user/foo
2. File name starts with `_`: /user/_id.vue -> /user/:id
3. File name is `index.vue`: /user/index.vue -> /user
4. File name is `_`: /_.vue -> /:pathMatch(.*)*
