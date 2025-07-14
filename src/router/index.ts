import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/recentpost',
      name: 'recentpost',
      component: () => import('../views/post/RecentPostsView.vue'),
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('../views/post/PostsView.vue'),
    },
    {
      path: '/post/create',
      name: 'post/create',
      component: () => import('../views/post/CreatePostView.vue'),
    },
    {
      path: '/post/:id',
      name: 'post/detail',
      component: () => import('../views/post/PostDetailView.vue'),
    },
    {
      path: '/post/:id/update',
      name: 'post/update',
      component: () => import('../views/post/UpdatePostView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/LoginView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
});

export default router;
