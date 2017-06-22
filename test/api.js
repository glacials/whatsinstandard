var fs = require("fs");
var chai = require("chai");
var expect = chai.expect;

describe("API", function() {
  var apiPath = "./api";

  describe("v1", function() {
    var versionPath = apiPath + "/1";

    it("shouldn't exist", function() {
      var exists = fs.existsSync(versionPath);
      expect(exists).to.be.false;
    });
  });

  describe("v2", function() {
    var versionPath = apiPath + "/2";

    it("shouldn't exist", function() {
      var exists = fs.existsSync(versionPath);
      expect(exists).to.be.false;
    });
  });

  describe("v3", function() {
    var versionPath = apiPath + "/3";

    it("shouldn't exist", function() {
      var exists = fs.existsSync(versionPath);
      expect(exists).to.be.false;
    });
  });

  describe("v4", function() {
    var versionPath = apiPath + "/4";

    describe("sets.json", function() {
      var setsPath = versionPath + "/sets.json";
      var sets = JSON.parse(fs.readFileSync(setsPath, "utf8"));

      it("should be an array", function() {
        expect(sets).to.be.an('array');
      });

      it("should have between 8 and 10 sets", function() {
        expect(sets).to.have.length.within(8, 10);
      });

      sets.forEach(function(set) {
        describe(set.name, function() {
          describe("name", function() {
            var name = set.name;

            it("should be a string", function() {
              expect(name).to.be.a.string;
            });

            it("should have a nonzero length", function() {
              expect(name).to.not.have.length(0);
            });
          });

          describe("block", function() {
            var block = set.block;

            it("should be a string", function() {
              expect(block).to.be.a.string;
            });

            it("should have a nonzero length", function() {
              expect(block).to.not.have.length(0);
            });

            it("should be the same as the previous set's block or equal to this set's name", function() {
              var validNames = new Set([set.name]);
              if (sets.indexOf(set) > 0) {
                validNames.add(sets[sets.indexOf(set) - 1].block);
              }

              expect(block).to.be.oneOf([...validNames]);
            });
          });

          describe("code", function() {
            var code = set.code;

            it("should be a string", function() {
              expect(code).to.be.a.string;
            });

            it("should be three characters", function() {
              expect(code).to.have.length(3);
            });

            it("should be all caps", function() {
              expect(code).to.equal(code.toUpperCase());
            });
          });

          describe("symbol", function() {
            var symbol = set.symbol;

            it("should be absent", function() {
              expect(symbol).to.be.undefined;
            });
          });

          describe("enter date", function() {
            var enterDate = set.enter_date;

            it("should be a string", function() {
              expect(enterDate).to.be.a.string;
            });

            it("should be an ISO 8601 datetime", function() {
              expect(Date.parse(enterDate)).to.be.a('number');
            });

            it("should represent midnight", function() {
              expect(enterDate).to.contain("00:00:00.00");
            });
          });

          describe("exit date", function() {
            var exitDate = set.exit_date;

            it("should be a string or null", function() {
              expect(exitDate || "").to.be.a.string;
            });

            it("should be an ISO 8601 datetime if present", function() {
              expect(Date.parse(exitDate || "1970-01-01T00:00:00.000Z")).to.be.a('number');
            });

            it("should represent midnight if present", function() {
              expect(exitDate || "1970-01-01T00:00:00.000Z").to.contain("00:00:00.00");
            });
          });

          describe("rough exit date", function() {
            var roughExitDate = set.rough_exit_date;

            it("should be a string", function() {
              expect(roughExitDate).to.be.a.string;
            });

            it("should be QX 20XX or late 20XX", function() {
              expect(roughExitDate).to.match(/Q\d 20\d\d/);
            });
          });
        });
      });
    });
  });
});
