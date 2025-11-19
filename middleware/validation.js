export const validate = (Schema) => {
  return (req, res, next) => {
    console.log(req.body);

    const inputs = { ...req.body, ...req.params, ...req.query };
    const { error } = Schema.validate(inputs, { abortEarly: false });

    if (error) {
      const errors = error.details.map((item) => ({
        message: item.message,
        field: item.path.join("."),
      }));
    }
    next();
  };
};
