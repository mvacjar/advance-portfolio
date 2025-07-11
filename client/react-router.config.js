export default {
  ssr: true,
  // Better for SEO and performance because it will
  // render the html and head while rendering,
  // place any page that you would like to include
  async prerender() {
    return ['/'];
  },
};
