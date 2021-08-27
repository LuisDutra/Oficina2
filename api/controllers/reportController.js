const PlantModel = require("../models/plantModel");
const UserModel = require("../models/userModel");

const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

const getAllPlantsReports = async ({}, res) => {
    const plants = await PlantModel.findOne({ _id: "61035a89d1f7ae8448b9e33c"});


    const json2csvParser = new Json2csvParser({ header: false });
    const csvData = json2csvParser.parse(plants);
    console.log(csvData)

     fs.writeFile("plants.csv", csvData, function(error) {
        if (error) throw error;
        console.log("Plants.csv successfully!");
      });
      res.status(200).send(csvData);
  };

  exports.reportPlants = getAllPlantsReports;
