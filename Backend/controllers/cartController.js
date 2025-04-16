import userModel from "../models/userModel.js";



const addToCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ From decoded JWT
    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// remove items from the users cart
// const removeFromCart = async (req, res) => {
//   try {
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     if (cartData[req.body.itemId] > 0) {
//       cartData[req.body.itemId] -= 1;
//     }
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//     res.json({ success: true, message: "removed from cart" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };



const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId; // ✅ From token
    const { itemId } = req.body;

    if (!itemId) {
      return res
        .status(400)
        .json({ success: false, message: "Item ID is required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // Optional: remove item from object if count is now 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Removed from cart" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};






//fetch user cart data
const getCart = async (req, res) => {
  try {

    let userData = await userModel.findById(req.userId);
    
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



export { addToCart, removeFromCart, getCart };
