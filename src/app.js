export class App {
  configureRouter(config, router) {
    config.title = 'Magic Mirror';
    config.map([{
      route: ['', 'magic-mirror'],
      name: 'magic-mirror',
      moduleId: 'magic-mirror',
      nav: true,
      title: 'Magic Mirror'
    }]);

    this.router = router;
  }
}
