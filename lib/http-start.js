function startHttp(app, port) {

  app.connection({ port });

  app.start( err => {
    if (err) throw err;
    console.log(`Server running at: ${app.info.uri}`);
  });
}

module.exports = startHttp;
