import mongoose from "mongoose";

const { Schema } = mongoose;

const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    items: [cartItemSchema],
    cartTotal: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

// ----------------------------
// ADD THIS METHOD CORRECTLY!!
// ----------------------------
cartSchema.methods.calcTotal = function () {
  let total = 0;

  this.items.forEach((item) => {
    total += item.price * item.quantity;
  });

  this.cartTotal = total;
  return total;
};
// ----------------------------

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;