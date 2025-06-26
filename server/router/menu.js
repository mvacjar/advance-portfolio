const express = require('express');
const MenuController = require('../controllers/menu');
const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post('/menu', [md_auth.asureAuth], MenuController.createMenu);
api.get('/menus', MenuController.getMenus);
api.patch('/menu/:id', [md_auth.asureAuth], MenuController.updateMenu);
api.delete('/menu/:id', [md_auth.asureAuth], MenuController.deleteMenu);

module.exports = api;
