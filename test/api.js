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

    it("shouldn't exist", function() {
      var exists = fs.existsSync(versionPath);
      expect(exists).to.be.false;
    });
  });

  describe("v5", function() {
    var versionPath = apiPath + "/v5";

    describe("sets.json", function() {
      var setsPath = versionPath + "/sets.json";
      var body = JSON.parse(fs.readFileSync(setsPath, "utf8"));

      it("should be an object", function() {
        expect(body).to.be.an('object');
      });

      it("should be marked not deprecated", function() {
        expect(body.deprecated).to.be.false;
      });

      it("should have a sets array", function() {
        expect(body.sets).to.be.an('array');
      });

      it("shouldn't have too few or too many sets", function() {
        expect(body.sets).to.have.length.within(8, 16);
      });

      body.sets.forEach(function(set) {
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

            it("should have a nonzero length or be null", function() {
              expect(block || "abc").to.not.have.length(0);
            });

            it("should be the same as the previous set's block or equal to this set's name or be null", function() {
              var validNames = new Set([set.name, null]);
              if (body.sets.indexOf(set) > 0) {
                validNames.add(body.sets[body.sets.indexOf(set) - 1].block);
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

            it("should not attach a timezone", function() {
              expect(enterDate.substring(enterDate.length - 12, enterDate.length - 1)).to.equal("00:00:00.00");
            });
          });

          describe("exit date", function() {
            var exitDate = set.exit_date;

            it("should be a string or null", function() {
              expect(exitDate || "").to.be.a.string;
            });

            it("should be an ISO 8601 datetime if present", function() {
              expect(Date.parse(exitDate || "1970-01-01T00:00:00.000")).to.be.a('number');
            });

            it("should represent midnight if present", function() {
              expect(exitDate || "1970-01-01T00:00:00.000").to.contain("00:00:00.00");
            });

            it("should not attach a timezone if present", function() {
              expect(
                (exitDate || "1970-01-01T00:00:00.000").substring(
                  (exitDate || "1970-01-01T00:00:00.000").length - 12,
                  (exitDate || "1970-01-01T00:00:00.000").length - 1
                )
              ).to.equal("00:00:00.00");
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
