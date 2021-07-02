import chai from 'chai'
const { use, expect } = chai

import chaiUrl from 'chai-url'
import chaiJsonSchema from 'chai-json-schema'

use(chaiUrl)
use(chaiJsonSchema)

import { existsSync, readFileSync } from "fs"

describe("API", () => {
  const apiPath = "./api"

  describe("v1", () => {
    const versionPath = apiPath + "/1"

    it("shouldn't exist", () => {
      const exists = existsSync(versionPath)
      expect(exists).to.be.false
    })
  })

  describe("v2", () => {
    const versionPath = apiPath + "/2"

    it("shouldn't exist", () => {
      const exists = existsSync(versionPath)
      expect(exists).to.be.false
    })
  })

  describe("v3", () => {
    const versionPath = apiPath + "/3"

    it("shouldn't exist", () => {
      const exists = existsSync(versionPath)
      expect(exists).to.be.false
    })
  })

  describe("v4", () => {
    const versionPath = apiPath + "/4"

    it("shouldn't exist", () => {
      const exists = existsSync(versionPath)
      expect(exists).to.be.false
    })
  })

  describe("v5", () => {
    const versionPath = apiPath + "/v5"

    describe("sets.json", () => {
      const setsPath = versionPath + "/sets.json"
      const body = JSON.parse(readFileSync(setsPath, "utf8"))

      it("should be an object", () => {
        expect(body).to.be.an('object')
      })

      it("should be marked deprecated", () => {
        expect(body.deprecated).to.be.true
      })

      it("should have a sets array", () => {
        expect(body.sets).to.be.an('array')
      })

      it("shouldn't have too few sets", () => {
        expect(body.sets).to.have.length.above(8)
      })

      body.sets.forEach(set => {
        describe(set.name, () => {
          describe("name", () => {
            const name = set.name

            it("should be a string", () => {
              expect(name).to.be.a.string
            })

            it("should have a nonzero length", () => {
              expect(name).to.not.have.length(0)
            })
          })

          describe("block", () => {
            const block = set.block

            it("should be a string", () => {
              expect(block).to.be.a.string
            })

            it("should have a nonzero length or be null", () => {
              expect(block || "abc").to.not.have.length(0)
            })

            it("should be the same as the previous set's block or equal to this set's name or be null", () => {
              const validNames = new Set([set.name, null])
              if (body.sets.indexOf(set) > 0) {
                validNames.add(body.sets[body.sets.indexOf(set) - 1].block)
              }

              expect(block).to.be.oneOf([...validNames])
            })
          })

          describe("code", () => {
            const code = set.code

            it("should be a string", () => {
              expect(code).to.be.a.string
            })

            it("should be three characters", () => {
              expect(code).to.have.length(3)
            })

            it("should be all caps", () => {
              expect(code).to.equal(code.toUpperCase())
            })
          })

          describe("symbol", () => {
            const symbol = set.symbol

            it("should be absent", () => {
              expect(symbol).to.be.undefined
            })
          })

          describe("enter date", () => {
            const enterDate = set.enter_date

            it("should be a string or null", () => {
              expect(enterDate || "").to.be.a.string
            })

            it("should be an ISO 8601 datetime if present", () => {
              expect(Date.parse(enterDate || "1970-01-01T00:00:00.000")).to.be.a('number')
            })

            it("should represent midnight if present", () => {
              expect(enterDate || "1970-01-01T00:00:00.000").to.contain("00:00:00.00")
            })

            it("should not attach a timezone if present", () => {
              expect(
                (enterDate || "1970-01-01T00:00:00.000").substring(
                  (enterDate || "1970-01-01T00:00:00.000").length - 12,
                  (enterDate || "1970-01-01T00:00:00.000").length - 1
                )
              ).to.equal("00:00:00.00")
            })
          })

          describe("exit date", () => {
            const exitDate = set.exit_date

            it("should be a string or null", () => {
              expect(exitDate || "").to.be.a.string
            })

            it("should be an ISO 8601 datetime if present", () => {
              expect(Date.parse(exitDate || "1970-01-01T00:00:00.000")).to.be.a('number')
            })

            it("should represent midnight if present", () => {
              expect(exitDate || "1970-01-01T00:00:00.000").to.contain("00:00:00.00")
            })

            it("should not attach a timezone if present", () => {
              expect(
                (exitDate || "1970-01-01T00:00:00.000").substring(
                  (exitDate || "1970-01-01T00:00:00.000").length - 12,
                  (exitDate || "1970-01-01T00:00:00.000").length - 1
                )
              ).to.equal("00:00:00.00")
            })
          })

          describe("rough exit date", () => {
            const roughExitDate = set.rough_exit_date

            it("should be a string", () => {
              expect(roughExitDate).to.be.a.string
            })

            it("should be QX 20XX", () => {
              expect(roughExitDate).to.match(/Q\d 20\d\d/)
            })
          })
        })
      })

      body.bans.forEach(ban => {
        describe(ban.card_name, () => {
          describe("card name", () => {
            const cardName = ban.card_name

            it("should be a string", () => {
              expect(cardName).to.be.a.string
            })

            it("should have a nonzero length", () => {
              expect(cardName).to.not.have.length(0)
            })
          })

          describe("card image URL", () => {
            const cardImageURL = ban.card_image_url

            it("should be a string", () => {
              expect(cardImageURL).to.be.a.string
            })

            it("should have a nonzero length", () => {
              expect(cardImageURL).to.not.have.length(0)
            })

            it("should use HTTPS", () => {
              expect(cardImageURL).to.have.protocol("https")
            })
          })

          describe("set code", () => {
            const setCode = ban.set_code

            it("should be in the sets array", () => {
              const validCodes = new Set(body.sets.map(set => set.code))

              expect(setCode).to.be.oneOf([...validCodes])
            })
          })

          describe("reason", () => {
            const reason = ban.reason

            it("should be a string", () => {
              expect(reason).to.be.a.string
            })

            it("should have a nonzero length", () => {
              expect(reason).to.not.have.length(0)
            })

            it("should be a complete sentence", () => {
              expect(reason.substr(-1)).to.equal(".")
              expect(reason[0]).to.equal(reason[0].toUpperCase())
            })

            it("should start with 'Banned for'", () => {
              expect(reason.slice(0, 10)).to.equal("Banned for")
            })
          })

          describe("announcement URL", () => {
            const announcementURL = ban.announcement_url

            it("should be a string", () => {
              expect(announcementURL).to.be.a.string
            })

            it("should have a nonzero length", () => {
              expect(announcementURL).to.not.have.length(0)
            })

            it("should use HTTPS", () => {
              expect(announcementURL).to.have.protocol("https")
            })

            it("should be an official Wizards of the Coast link", () => {
              expect(announcementURL).to.have.hostname("magic.wizards.com")
            })
          })
        })
      })
    })
  })

  describe("v6", () => {
    const versionPath = apiPath + "/v6"

    describe("standard.json", () => {
      const apiPath = versionPath + "/standard.json"
      const schemaPath = versionPath + "/schema.json"
      const schemaUrl = "https://whatsinstandard.com/api/v6/schema.json"
      const api = JSON.parse(readFileSync(apiPath, "utf8"))
      const schema = JSON.parse(readFileSync(schemaPath, "utf8"))

      it("should declare its schema", () => {
        expect(api["$schema"]).to.equal(schemaUrl)
      })

      it("should adhere to its schema", () => {
        expect(api).to.be.jsonSchema(schema)
      })
    })
  })
})
