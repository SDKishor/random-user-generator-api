module.exports.getRandomUsers = (data) => {
  return (req, res, next) => {
    const result = data[Math.floor(Math.random() * data.length)];

    res.json(result);
  };
};

module.exports.getAllUsers = (data) => {
  return (req, res, next) => {
    const result = data;
    if (req.query.page === undefined && req.query.limit === undefined) {
      res.json(result);
    } else {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      result = data.slice(startIndex, endIndex);
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send("No More User");
      }
    }
  };
};

module.exports.createUser = (data, validationResult) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(errors);

    const newUser = req.body;
    newUser.id = data.length + 1;
    console.log(newUser);

    data.push(newUser);
    res.status(201).send("success");
  };
};

module.exports.updateUser = (data) => {
  return (req, res, next) => {
    const id = parseInt(req.params.id);

    console.log(id + 1 > data.length);

    if (id + 1 > data.length) {
      return res.status(404).json({
        status: "fail",
        errors: "invalid ID",
      });
    }

    const updatedData = req.body;
    const foundData = data.find((d) => d.id === parseInt(id));

    if (foundData) {
      const index = data.indexOf(foundData);

      data[index].name =
        updatedData.name === undefined ? data[index].name : updatedData.name;
      data[index].gender =
        updatedData.gender === undefined
          ? data[index].gender
          : updatedData.gender;
      data[index].contact =
        updatedData.contact === undefined
          ? data[index].contact
          : updatedData.contact;
      data[index].address =
        updatedData.address === undefined
          ? data[index].address
          : updatedData.address;
      data[index].photoUrl =
        updatedData.photoUrl === undefined
          ? data[index].photoUrl
          : updatedData.photoUrl;
    } else {
      res.status(404).json({ message: "There is no such user data" });
    }

    res.status(200).json({
      status: "success",
      data: {
        updatedUser: "hello",
      },
    });
  };
};

module.exports.BulkUpdateUser = (data) => {
  return (req, res, next) => {
    const updatedData = req.body;

    if (Object.keys(updatedData).length === 0) {
      res.status(400).json({
        status: "fail",
        data: {
          updatedUser: "there is no data to update",
        },
      });
    } else {
      for (let i = 0; i < updatedData.length; i++) {
        const foundData = data.find(
          (d) => d.id === parseInt(updatedData[i].id)
        );

        if (foundData) {
          const index = data.indexOf(foundData);

          data[index].name =
            updatedData[i].name === undefined
              ? data[index].name
              : updatedData[i].name;
          data[index].gender =
            updatedData[i].gender === undefined
              ? data[index].gender
              : updatedData[i].gender;
          data[index].contact =
            updatedData[i].contact === undefined
              ? data[index].contact
              : updatedData[i].contact;
          data[index].address =
            updatedData[i].address === undefined
              ? data[index].address
              : updatedData[i].address;
          data[index].photoUrl =
            updatedData[i].photoUrl === undefined
              ? data[index].photoUrl
              : updatedData[i].photoUrl;
        } else {
          res.status(404).json({ message: "There is no such user data id" });
        }
      }

      res.status(200).json({
        status: "success",
        data: {
          updatedUser: "hello",
        },
      });
    }
  };
};

module.exports.deleteUser = (data, validationResult) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const deleted = data.find((d) => d.id === parseInt(id));

    if (deleted) {
      const index = data.indexOf(deleted);
      data.splice(index, 1);

      res.send(data);
    } else {
      res.status(404).json({ message: "There is no such user data" });
    }
  };
};
