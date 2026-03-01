import { describe, it, expect, beforeEach } from "vitest";
import { parseStatementsFromHtml } from "../banking";

const twoDaysWithTwoEntriesEach = `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header ap-transaction-overview__header--sticky">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Vandaag - 28 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency currency--visible"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> BCK*INTERPARKING P5 VR&gt;UTRECHT </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -6,65
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Jumbo Zeist Laan v V  &gt;ZEIST </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -1,00
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr><!---->
                </tbody>
              </table>
            </ap-transaction-overview>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Gisteren - 27 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> VinkVink </div>
                          <!----><!---->
                        </div><!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -142,40</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Sparen </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -2.500,00</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <!---->
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`;

describe("Banking logic", () => {
  beforeEach(() => {});

  describe("given invalid inputs", () => {
    it("should throw for non-string", () => {
      expect(() =>
        parseStatementsFromHtml(undefined as unknown as string, 126, 0),
      ).toThrowError("input must be a string");
      expect(() =>
        parseStatementsFromHtml(0 as unknown as string, 126, 0),
      ).toThrowError("input must be a string");
      expect(() =>
        parseStatementsFromHtml({} as unknown as string, 126, 0),
      ).toThrowError("input must be a string");
    });

    it("should throw for empty string", () => {
      expect(() => parseStatementsFromHtml("", 126, 0)).toThrowError(
        "input cannot be empty",
      );
    });

    it("should throw for invalid unusable structure", () => {
      expect(() =>
        parseStatementsFromHtml("<div>this is not enough data", 126, 0),
      ).toThrowError("input does not contain required data");
    });
  });

  describe("given valid inputs", () => {
    it("should return no items when supplied with empty overview", () => {
      expect(
        parseStatementsFromHtml(
          "<ap-transaction-container></ap-transaction-container>",
          126,
          0,
        ),
      ).toEqual({
        dayEntries: {},
        scannedUpTo: {
          amountOfEntries: 0,
          dateLabel: 126,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should return empty date when supplied with one empty date", () => {
      expect(
        parseStatementsFromHtml(
          `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header ap-transaction-overview__header--sticky">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Vandaag - 28 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency currency--visible"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`,
          126,
          0,
        ),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {},
          },
        },
        scannedUpTo: {
          amountOfEntries: 0,
          dateLabel: 128,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should return date with one item when supplied with date with one item", () => {
      expect(
        parseStatementsFromHtml(
          `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header ap-transaction-overview__header--sticky">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Vandaag - 28 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency currency--visible"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> BCK*INTERPARKING P5 VR&gt;UTRECHT </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -6,65
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`,
          126,
          0,
        ),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          amountOfEntries: 1,
          dateLabel: 128,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should return date with multiple items when supplied with one date with multiple items", () => {
      expect(
        parseStatementsFromHtml(
          `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header ap-transaction-overview__header--sticky">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Vandaag - 28 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency currency--visible"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> BCK*INTERPARKING P5 VR&gt;UTRECHT </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -6,65
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Jumbo Zeist Laan v V  &gt;ZEIST </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -1,00
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr><!---->
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`,
          126,
          0,
        ),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
              1: {
                title: "Jumbo Zeist Laan v V  &gt;ZEIST",
                dateLabel: "28 februari",
                amount: -1,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          amountOfEntries: 2,
          dateLabel: 128,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should return multiple dates with multiple items when supplied with multiple dates with multiple items", () => {
      expect(
        parseStatementsFromHtml(twoDaysWithTwoEntriesEach, 126, 0),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
              1: {
                title: "Jumbo Zeist Laan v V  &gt;ZEIST",
                dateLabel: "28 februari",
                amount: -1,
                prefilledCategory: undefined,
              },
            },
          },
          127: {
            dateLabel: "27 februari",
            items: {
              0: {
                title: "VinkVink",
                dateLabel: "27 februari",
                amount: -142.4,
                prefilledCategory: undefined,
              },
              1: {
                title: "Sparen",
                dateLabel: "27 februari",
                amount: -2500,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          amountOfEntries: 2,
          dateLabel: 128,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should stop scanning at last scan date", () => {
      expect(
        parseStatementsFromHtml(twoDaysWithTwoEntriesEach, 127, 2),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
              1: {
                title: "Jumbo Zeist Laan v V  &gt;ZEIST",
                dateLabel: "28 februari",
                amount: -1,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 128,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should not include items from an uncomplete day that have already been scanned", () => {
      expect(
        parseStatementsFromHtml(twoDaysWithTwoEntriesEach, 128, 1),
      ).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 128,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should correctly scan new items after scanning the first time", () => {
      const firstParseResult = parseStatementsFromHtml(
        `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Gisteren - 27 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> VinkVink </div>
                          <!----><!---->
                        </div><!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -142,40</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Sparen </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -2.500,00</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <!---->
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`,
        126,
        0,
      );
      expect(firstParseResult).toEqual({
        dayEntries: {
          127: {
            dateLabel: "27 februari",
            items: {
              0: {
                title: "VinkVink",
                dateLabel: "27 februari",
                amount: -142.4,
                prefilledCategory: undefined,
              },
              1: {
                title: "Sparen",
                dateLabel: "27 februari",
                amount: -2500,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 127,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: false,
        },
      });
      const secondParseResult = parseStatementsFromHtml(
        twoDaysWithTwoEntriesEach,
        firstParseResult.scannedUpTo.dateLabel,
        firstParseResult.scannedUpTo.amountOfEntries,
      );
      expect(secondParseResult).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
              1: {
                title: "Jumbo Zeist Laan v V  &gt;ZEIST",
                dateLabel: "28 februari",
                amount: -1,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 128,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });

    it("should reset scanning when encountering a salary payment", () => {
      expect(
        parseStatementsFromHtml(
          `<ap-transaction-container>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header ap-transaction-overview__header--sticky">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Vandaag - 28 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency currency--visible"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> BCK*INTERPARKING P5 VR&gt;UTRECHT </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -6,65
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Jumbo Zeist Laan v V  &gt;ZEIST </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis">
                            <!----> -1,00
                          </span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr><!---->
                </tbody>
              </table>
            </ap-transaction-overview>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">Gisteren - 27 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> COOLBLUE BV </div>
                          <!----><!---->
                        </div><!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> +2.944,88</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Sparen </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -2.500,00</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <!---->
                </tbody>
              </table>
            </ap-transaction-overview>
            <ap-transaction-overview _nghost-ng-c350249031="">
              <table _ngcontent-ng-c350249031="" class="ap-transaction-overview">
                <caption _ngcontent-ng-c350249031="" class="ap-sr-only"> Transactie overzicht </caption>
                <thead _ngcontent-ng-c350249031="" class="ap-transaction-overview__header">
                  <tr _ngcontent-ng-c350249031="">
                    <th _ngcontent-ng-c350249031="" data-bb="ap-transaction-overview__date">26 februari</th>
                    <th _ngcontent-ng-c350249031="" class="ap-text-align-right"><span _ngcontent-ng-c350249031="" data-testid="transaction-overview-currency" class="ap-transaction-overview__currency"> € </span></th>
                  </tr>
                </thead>
                <tbody _ngcontent-ng-c350249031="">
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Test afschrijving 1 </div>
                          <!----><!---->
                        </div><!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -20,88</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <tr _ngcontent-ng-c350249031="" data-testid="transaction-item" ap-transaction-item="" class="ap-transaction-item" _nghost-ng-c3506695535="" tabindex="0">
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__left-column">
                      <!---->
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive">
                        <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__responsive-title">
                          <div _ngcontent-ng-c3506695535="" data-testid="title" class="ap-transaction-item__title"> Test afschrijving 2 </div>
                          <!----><!---->
                        </div>
                        <!---->
                      </div>
                    </td>
                    <td _ngcontent-ng-c3506695535="" class="ap-transaction-item__column ap-transaction-item__right-column">
                      <div _ngcontent-ng-c3506695535="" class="ap-transaction-item__amount--primary">
                        <ap-amount-display _ngcontent-ng-c3506695535="" data-bb="primary-amount" _nghost-ng-c660365021="">
                          <span _ngcontent-ng-c660365021="" data-testid="display-value" class="ap-amount-display ap-amount-display--extra-padding ap-amount-display--emphasis"><!----> -50,00</span>
                        </ap-amount-display>
                      </div>
                      <!----><!---->
                    </td>
                  </tr>
                  <!---->
                </tbody>
              </table>
            </ap-transaction-overview>
          </ap-transaction-container>`,
          125,
          0,
        ),
      ).toEqual({
        dayEntries: {
          127: {
            dateLabel: "27 februari",
            items: {
              0: {
                title: "Sparen",
                dateLabel: "27 februari",
                amount: -2500,
                prefilledCategory: undefined,
              },
            },
          },
          126: {
            dateLabel: "26 februari",
            items: {
              0: {
                title: "Test afschrijving 1",
                dateLabel: "26 februari",
                amount: -20.88,
                prefilledCategory: undefined,
              },
              1: {
                title: "Test afschrijving 2",
                dateLabel: "26 februari",
                amount: -50,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 127,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: true,
        },
      });
    });

    it("should scan everything if last scan date is lower than items in list", () => {
      expect(parseStatementsFromHtml(twoDaysWithTwoEntriesEach, 0, 0)).toEqual({
        dayEntries: {
          128: {
            dateLabel: "28 februari",
            items: {
              0: {
                title: "BCK*INTERPARKING P5 VR&gt;UTRECHT",
                dateLabel: "28 februari",
                amount: -6.65,
                prefilledCategory: undefined,
              },
              1: {
                title: "Jumbo Zeist Laan v V  &gt;ZEIST",
                dateLabel: "28 februari",
                amount: -1,
                prefilledCategory: undefined,
              },
            },
          },
          127: {
            dateLabel: "27 februari",
            items: {
              0: {
                title: "VinkVink",
                dateLabel: "27 februari",
                amount: -142.4,
                prefilledCategory: undefined,
              },
              1: {
                title: "Sparen",
                dateLabel: "27 februari",
                amount: -2500,
                prefilledCategory: undefined,
              },
            },
          },
        },
        scannedUpTo: {
          dateLabel: 128,
          amountOfEntries: 2,
          wasTrimmedBySalaryEntry: false,
        },
      });
    });
  });
});
