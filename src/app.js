const { app } = require('./bin/routes.js');

app.listen(3000, () => {
    console.log('servidor en puerto 3000');
})