import express from "express";
const router = express.Router();
import product_controller from "../controller/product_controller.js";


router.param('id', product_controller.findproductbyid);


router.route('/api/products')
    .get(product_controller.getallproduct)
    .post(product_controller.createproduct)
    .delete(product_controller.deleteallproduct);

router.route('/api/products/:id')
    .put(product_controller.updateproductbyid)
    .delete(product_controller.deleteproductbyid);


// router.route('/api/users').post(userCtrl.create)
// router.route('/api/users').get(userCtrl.list)
// router.param('userId', userCtrl.userByID)
// router.route('/api/users/:userId').get(userCtrl.read)
// router.route('/api/users/:userId').put(userCtrl.update)
// router.route('/api/users/:userId').delete(userCtrl.remove)


export default router
