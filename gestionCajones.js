// jshint esversion: 8
const { By, Key, Builder } = require("selenium-webdriver");
const { generate } = require('randomstring')
require('geckodriver')
const gestionCajones = async () => {
    let user = 'alejandroalba999@gmail.com';
    let pwd = '12345678';

    let driver = new Builder().forBrowser('firefox').build();

    try {
        //Accedemos a la URL de nuestro proyecto
        await driver.get("https://estacionamiento-web-frontend.herokuapp.com/auth/login");

        //Le indicamos que agregue nuestro usuario y contraseña
        await driver.findElement(By.id('strCorreo')).sendKeys(user);
        await driver.findElement(By.id('strContrasena')).sendKeys(pwd);

        // le indicamos que envie los datos con nuestro boton de tipo submit
        await driver.findElement(By.id('password')).sendKeys(Key.ENTER);

        await driver.sleep(3000);
        //Accedemos a nuestra URL donde se gestionan los cajones
        const currentUrl = await driver.getCurrentUrl();
        if (currentUrl == 'https://estacionamiento-web-frontend.herokuapp.com/dashboard') {
            await driver.get('https://estacionamiento-web-frontend.herokuapp.com/gestionCajones');

            //Le endicamos que agregue un numero random del 1 al 10
            await driver.findElement(By.xpath('//*[@id="number"]')).sendKeys(Math.floor(Math.random() * (10 - 1)) + 1);
            //Le indicamos que genere random string con la libreria
            await driver.findElement(By.xpath('//*[@id="description"]')).sendKeys(generate(8));
            //Le indicamos que espere 2 segundos antes de presionar el registrar
            await driver.sleep(2000);
            //Le indicamos que envie un enter al boton de registrar
            await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/div/div/div[1]/div/form/div[3]/div/button[2]')).sendKeys(Key.ENTER);
        } else {
            console.log('Algo salio mal');
        }
    } catch (error) {
        console.log(error);
    }
    finally {
        //Le indicamos que espere 3 segundos antes de cerrar
        await driver.sleep(3000);
        await driver.quit();
    }
}

gestionCajones()