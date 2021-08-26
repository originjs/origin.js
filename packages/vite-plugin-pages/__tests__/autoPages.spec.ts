import { generateRoutes } from '../src/generates'
import { getPages } from '../src/pages'

describe('files', () => {
  const pagesDir = 'packages/vite-plugin-pages/__tests__/assets/pages'
  const layoutsDir= 'packages/vite-plugin-pages/__tests__/assets/layouts'

  test('auto pages router', () => {
    const expected = [
      {
        path:'/',
        component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/default.vue')`,
        children:[
          {
            name:'index',
            path:'/',
            component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/index.vue')`,
            meta:{
              layout:'default',
            },
          },
        ],
      },
      {
        path:'/user',
        component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/default.vue')`,
        children:[
          {
            name:'user',
            path:'/user',
            component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/user/index.vue')`,
            meta:{
              layout:'',
            },
            children:[
              {
                path:'/user/:id',
                component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/bar.vue')`,
                children:[
                  {
                    name:'user-_id',
                    path:'/user/:id',
                    component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/user/_id.vue')`,
                    meta:{
                      layout:'bar',
                    },
                  },
                ],
              },
              {
                path:'/user/foo',
                component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/default.vue')`,
                children:[
                  {
                    name:'user-foo',
                    path:'/user/foo',
                    component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/user/foo.vue')`,
                    meta:{
                      layout:'',
                    },
                  },
                ],
              },
              {
                path:'/user/nest_user/foo',
                component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/default.vue')`,
                children:[
                  {
                    name:'user-nest_user-foo',
                    path:'/user/nest_user/foo',
                    component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/user/nest_user/foo.vue')`,
                    meta:{
                      layout:'',
                    },
                  },
                ],
              },
              {
                path:'/user/zoom',
                component:`() => import('packages/vite-plugin-pages/__tests__/assets/layouts/content.vue')`,
                children:[
                  {
                    name:'user-zoom',
                    path:'/user/zoom',
                    component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/user/zoom.vue')`,
                    meta:{
                      layout:'content',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name:'_',
        path:'/:pathMatch(.*)*',
        component:`() => import('packages/vite-plugin-pages/__tests__/assets/pages/_.vue')`,
        meta:{
          layout:'',
        },
      },
    ]
    const pages=getPages(pagesDir)
    const routes=generateRoutes(pages,{
      root: process.cwd(),
      pagesDir: pagesDir,
      layoutsDir: layoutsDir,
      extension: ['vue'],
    })
    expect(routes).toEqual(expected)


  })
})
