const Menu = require('../models/menu');

async function createMenu(req, res) {
  const menu = new Menu(req.body);

  try {
    const menuStored = await menu.save();
    res.status(200).send({ msg: 'Menu created', menu: menuStored });
  } catch (error) {
    res.status(400).send({ msg: 'Menu not created' });
  }
}

async function getMenus(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: 'asc' });
  } else {
    response = await Menu.find({ active }).sort({ order: 'asc' });
  }

  if (!response) {
    res.status(400).send({ msg: 'Menus not found' });
  } else {
    res.status(200).send({ msg: response });
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  try {
    const updatedMenu = await Menu.findByIdAndUpdate(id, menuData, { new: true });
    if (!updatedMenu) {
      return res.status(404).send({ msg: 'Menu not found' });
    }
    res.status(200).send({ msg: 'Menu updated', menu: updatedMenu });
  } catch (error) {
    res.status(400).send({ msg: 'Menu not updated' });
  }
}

async function deleteMenu(req, res) {
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Menu deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'Error deleting menu' });
  }
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
};
