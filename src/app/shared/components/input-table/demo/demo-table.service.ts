import { Injectable } from '@angular/core';
import { ICellCompareDto } from '../entitites/cell-compare.dto';
import { ICellDto } from '../entitites/cell.dto';
import { IInputDto } from '../entitites/input.dto';
import { IProductDto } from '../entitites/product.dto';

@Injectable({ providedIn: 'root' })
export class DemoTableService {
    constructor() {}

    getProduct(): IProductDto[] {
        return [
            { id: 27, name: 'D_HL_RENRP', categoryName: 'Unit Linked' },
            { id: 28, name: 'D_HL_RENSP', categoryName: 'Unit Linked' },
            { id: 29, name: 'DRENRP', categoryName: 'Unit Linked' },
            { id: 30, name: 'DRENSP', categoryName: 'Unit Linked' },
            { id: 31, name: 'D_HL_KAOTH', categoryName: 'Unit Linked' },
            { id: 32, name: 'DKAGRU', categoryName: 'Unit Linked' },
            { id: 33, name: 'DKAOTH', categoryName: 'Unit Linked' },
            { id: 34, name: 'DKAVBG', categoryName: 'Unit Linked' },
            { id: 35, name: 'P_BUN', categoryName: 'Unit Linked' },
            { id: 36, name: 'P_HL_BUN', categoryName: 'Unit Linked' },
            { id: 37, name: 'D_HL_RISK', categoryName: 'Unit Linked' },
            { id: 38, name: 'D_RISK', categoryName: 'Unit Linked' },
            { id: 39, name: 'D_RSV', categoryName: 'Unit Linked' },
            { id: 40, name: 'D_FRV', categoryName: 'Non Unit Linked' },
            { id: 41, name: 'D_HL_FRV', categoryName: 'Non Unit Linked' },
            { id: 42, name: 'D_HL_FLV97', categoryName: 'Non Unit Linked' },
            { id: 43, name: 'DFLV97', categoryName: 'Non Unit Linked' }
        ];
    }

    getInput(): IInputDto[] {
        return [
            {
                id: 1,
                name: 'MortalityRatesMale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 2,
                name: 'MortalityRatesFemale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            { id: 7, name: 'LapseRates', typeId: 1, categoryName: 'SomeCategory' },
            { id: 8, name: 'ProductValues', typeId: 1, categoryName: 'SomeCategory' },
            { id: 9, name: 'Gamma', typeId: 1, categoryName: 'SomeCategory' },
            { id: 10, name: 'AlphaGamma', typeId: 1, categoryName: 'SomeCategory' },
            { id: 11, name: 'PolicyFees', typeId: 1, categoryName: 'SomeCategory' },
            { id: 12, name: 'SurrenderFactor', typeId: 1, categoryName: 'SomeCategory' },
            {
                id: 13,
                name: 'ExperiencedMortalityRatesMale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 14,
                name: 'ExperiencedMortalityRatesFemale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 15,
                name: 'TechnicalInterestRates',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 16,
                name: 'AgeAdjustmentsMale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 17,
                name: 'AgeAdjustmentsFemale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 18,
                name: 'MathsReserveBonusPercentage',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 19,
                name: 'RecoveryRatesMale',
                typeId: 1,
                categoryName: 'SomeCategory'
            },
            {
                id: 20,
                name: 'RecoveryRatesFemale',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 21,
                name: 'ClaimMortalityRatesMale',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 22,
                name: 'ClaimMortalityRatesFemale',
                typeId: 1,
                categoryName: 'Category A'
            },
            { id: 23, name: 'InceptionRatesMale', typeId: 1, categoryName: 'Category A' },
            {
                id: 24,
                name: 'InceptionRatesFemale',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 25,
                name: 'ExperiencedInceptionRatesMale',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 26,
                name: 'ExperiencedInceptionRatesFemale',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 27,
                name: 'ProfitSharePercentage',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 28,
                name: 'ProfitSharePercentageRider',
                typeId: 1,
                categoryName: 'Category A'
            },
            { id: 29, name: 'MultiplierAnsatz', typeId: 1, categoryName: 'Category A' },
            { id: 30, name: 'Alpha', typeId: 1, categoryName: 'Category A' },
            {
                id: 31,
                name: 'ProfitSharingPremiumPercentage',
                typeId: 1,
                categoryName: 'Category A'
            },
            { id: 32, name: 'MortalityFactors', typeId: 1, categoryName: 'Category A' },
            {
                id: 33,
                name: 'AdditionalReserveFactors',
                typeId: 1,
                categoryName: 'Category A'
            },
            { id: 34, name: 'AdvisorSurcharges', typeId: 1, categoryName: 'Category A' },
            { id: 35, name: 'AssumptionValues', typeId: 1, categoryName: 'Category A' },
            {
                id: 36,
                name: 'DepositAccountInterestRate',
                typeId: 1,
                categoryName: 'Category A'
            },
            { id: 38, name: 'MortalityEndAges', typeId: 1, categoryName: 'Category A' },
            {
                id: 39,
                name: 'MortalitySelectFactors',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 40,
                name: 'NonGuaranteedBonusPercentages',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 41,
                name: 'ReferenceValueFactorPercentages',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 42,
                name: 'ReferenceValueOfBonusRates',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 43,
                name: 'ReferenceValueOfChargeRates',
                typeId: 1,
                categoryName: 'Category A'
            },
            {
                id: 44,
                name: 'RunSetup',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 45,
                name: 'SinglePremiumRatingFactorsFemale',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 46,
                name: 'SinglePremiumRatingFactorsHeaders',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 47,
                name: 'SinglePremiumRatingFactorsMale',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 48,
                name: 'SumAssuredFactors',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 49,
                name: 'SumAssuredThresholds',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 50,
                name: 'SurrenderFactor1',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 51,
                name: 'SurrenderFactor2',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 52,
                name: 'TariffMapping',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 53,
                name: 'TerminalCostDistributionTerm',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            { id: 54, name: 'Beta', typeId: 1, categoryName: 'ModelParameters' },
            {
                id: 55,
                name: 'PartPaymentPercentages',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 56,
                name: 'PartPaymentYears',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            { id: 57, name: 'PupFactor', typeId: 1, categoryName: 'ModelParameters' },
            {
                id: 58,
                name: 'ZzrDiscountRates',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 59,
                name: 'ZzrScalingFactors',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 60,
                name: 'MaximumZillmerTerm',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 61,
                name: 'TerminalBonusPercentages',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 62,
                name: 'TerminalBonusPercentagesRider',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 63,
                name: 'CommissionPercentages',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 64,
                name: 'SurrenderValuePercentages',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 65,
                name: 'SurrenderValuePercentagesRider',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 66,
                name: 'ExpenseAssumptions',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            { id: 67, name: 'LapseRatesRsv', typeId: 1, categoryName: 'ModelParameters' },
            {
                id: 68,
                name: 'ScalingFactors',
                typeId: 1,
                categoryName: 'ModelParameters'
            },
            {
                id: 69,
                name: 'LapseRatesUpShock',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 70,
                name: 'LapseRatesDownShock',
                typeId: 2,
                categoryName: 'ModelParameters'
            },
            {
                id: 71,
                name: 'BalanceSheetReserveHgb',
                typeId: 1,
                categoryName: 'Assumptions'
            },
            {
                id: 72,
                name: 'InputForwardRateYieldCurve',
                typeId: 1,
                categoryName: 'Assumptions'
            },
            {
                id: 73,
                name: 'AnnualAverageYield',
                typeId: 1,
                categoryName: 'Assumptions'
            },
            {
                id: 74,
                name: 'ZzrDiscountRateForPreviousYear',
                typeId: 2,
                categoryName: 'Assumptions'
            },
            {
                id: 75,
                name: 'TargetAssetAllocation',
                typeId: 2,
                categoryName: 'Assumptions'
            },
            { id: 76, name: 'AssetExpenseInput', typeId: 2, categoryName: 'Assumptions' },
            {
                id: 77,
                name: 'ShareholderReplenishmentSplit',
                typeId: 2,
                categoryName: 'Assumptions'
            },
            {
                id: 78,
                name: 'AssetExpenseShockInput',
                typeId: 2,
                categoryName: 'Assumptions'
            },
            {
                id: 79,
                name: 'ManagementModel',
                typeId: 1,
                categoryName: 'Assumptions'
            }
        ];
    }

    getCell(): ICellDto[] {
        return [
            { productId: 27, runTypeId: 7, modelParamId: 69, inputId: 2 },
            { productId: 27, runTypeId: 7, modelParamId: 70, inputId: 3 },
            { productId: 27, runTypeId: 7, modelParamId: 69, inputId: 7 },
            { productId: 31, runTypeId: 7, modelParamId: 99, inputId: 1 },
            { productId: 31, runTypeId: 7, modelParamId: 98, inputId: 2 },
            { productId: 31, runTypeId: 7, modelParamId: 100, inputId: 7 },
            { productId: 31, runTypeId: 7, modelParamId: 92, inputId: 8 },
            { productId: 31, runTypeId: 7, modelParamId: 101, inputId: 9 },
            { productId: 31, runTypeId: 7, modelParamId: 103, inputId: 10 },
            { productId: 31, runTypeId: 7, modelParamId: 102, inputId: 11 },
            { productId: 31, runTypeId: 7, modelParamId: 104, inputId: 12 },
            { productId: 31, runTypeId: 7, modelParamId: 94, inputId: 13 },
            { productId: 31, runTypeId: 7, modelParamId: 93, inputId: 14 },
            { productId: 31, runTypeId: 7, modelParamId: 95, inputId: 15 },
            { productId: 31, runTypeId: 7, modelParamId: 97, inputId: 16 },
            { productId: 31, runTypeId: 7, modelParamId: 96, inputId: 17 },
            { productId: 32, runTypeId: 7, modelParamId: 106, inputId: 1 },
            { productId: 32, runTypeId: 7, modelParamId: 105, inputId: 2 },
            { productId: 32, runTypeId: 7, modelParamId: 109, inputId: 8 },
            { productId: 32, runTypeId: 7, modelParamId: 111, inputId: 9 },
            { productId: 32, runTypeId: 7, modelParamId: 110, inputId: 10 },
            { productId: 32, runTypeId: 7, modelParamId: 102, inputId: 11 },
            { productId: 32, runTypeId: 7, modelParamId: 112, inputId: 12 },
            { productId: 32, runTypeId: 7, modelParamId: 94, inputId: 13 },
            { productId: 32, runTypeId: 7, modelParamId: 93, inputId: 14 },
            { productId: 32, runTypeId: 7, modelParamId: 95, inputId: 15 },
            { productId: 32, runTypeId: 7, modelParamId: 97, inputId: 16 },
            { productId: 32, runTypeId: 7, modelParamId: 96, inputId: 17 },
            { productId: 33, runTypeId: 7, modelParamId: 106, inputId: 1 },
            { productId: 33, runTypeId: 7, modelParamId: 105, inputId: 2 },
            { productId: 33, runTypeId: 7, modelParamId: 107, inputId: 7 },
            { productId: 33, runTypeId: 7, modelParamId: 108, inputId: 8 },
            { productId: 33, runTypeId: 7, modelParamId: 101, inputId: 9 },
            { productId: 33, runTypeId: 7, modelParamId: 103, inputId: 10 },
            { productId: 33, runTypeId: 7, modelParamId: 102, inputId: 11 },
            { productId: 33, runTypeId: 7, modelParamId: 104, inputId: 12 },
            { productId: 33, runTypeId: 7, modelParamId: 94, inputId: 13 },
            { productId: 33, runTypeId: 7, modelParamId: 93, inputId: 14 },
            { productId: 33, runTypeId: 7, modelParamId: 95, inputId: 15 },
            { productId: 33, runTypeId: 7, modelParamId: 97, inputId: 16 },
            { productId: 33, runTypeId: 7, modelParamId: 96, inputId: 17 }
        ];
    }

    getCellCompare(): ICellCompareDto[] {
        return [
            { productId: 27, runTypeId: 7, inputId: 2, sourceModelParamId: 69, targetModelParamId: 69 },
            { productId: 27, runTypeId: 7, inputId: 3, sourceModelParamId: 70, targetModelParamId: 70 },
            { productId: 27, runTypeId: 7, inputId: 7, sourceModelParamId: 69, targetModelParamId: 69 },
            { productId: 31, runTypeId: 7, inputId: 1, sourceModelParamId: 99, targetModelParamId: 99 },
            { productId: 31, runTypeId: 7, inputId: 2, sourceModelParamId: 98, targetModelParamId: 98 },
            { productId: 31, runTypeId: 7, inputId: 7, sourceModelParamId: 100, targetModelParamId: 100 },
            { productId: 31, runTypeId: 7, inputId: 8, sourceModelParamId: 92, targetModelParamId: 92 },
            { productId: 31, runTypeId: 7, inputId: 9, sourceModelParamId: 101, targetModelParamId: 301 },
            { productId: 31, runTypeId: 7, inputId: 10, sourceModelParamId: 103, targetModelParamId: 103 },
            { productId: 31, runTypeId: 7, inputId: 11, sourceModelParamId: 102, targetModelParamId: 102 },
            { productId: 31, runTypeId: 7, inputId: 12, sourceModelParamId: 104, targetModelParamId: 104 },
            { productId: 31, runTypeId: 7, inputId: 13, sourceModelParamId: 94, targetModelParamId: 154 },
            { productId: 31, runTypeId: 7, inputId: 14, sourceModelParamId: 93, targetModelParamId: 93 },
            { productId: 31, runTypeId: 7, inputId: 15, sourceModelParamId: 95, targetModelParamId: 95 },
            { productId: 31, runTypeId: 7, inputId: 16, sourceModelParamId: 97, targetModelParamId: 97 },
            { productId: 31, runTypeId: 7, inputId: 17, sourceModelParamId: 96, targetModelParamId: 96 },
            { productId: 32, runTypeId: 7, inputId: 1, sourceModelParamId: 106, targetModelParamId: 178 },
            { productId: 32, runTypeId: 7, inputId: 2, sourceModelParamId: 105, targetModelParamId: 105 },
            { productId: 32, runTypeId: 7, inputId: 8, sourceModelParamId: 109, targetModelParamId: 109 },
            { productId: 32, runTypeId: 7, inputId: 9, sourceModelParamId: 111, targetModelParamId: 111 },
            { productId: 32, runTypeId: 7, inputId: 10, sourceModelParamId: 110, targetModelParamId: 110 },
            { productId: 32, runTypeId: 7, inputId: 11, sourceModelParamId: 102, targetModelParamId: 102 },
            { productId: 32, runTypeId: 7, inputId: 12, sourceModelParamId: 112, targetModelParamId: 112 },
            { productId: 32, runTypeId: 7, inputId: 13, sourceModelParamId: 94, targetModelParamId: 99 },
            { productId: 32, runTypeId: 7, inputId: 14, sourceModelParamId: 93, targetModelParamId: 93 },
            { productId: 32, runTypeId: 7, inputId: 15, sourceModelParamId: 95, targetModelParamId: 95 },
            { productId: 32, runTypeId: 7, inputId: 16, sourceModelParamId: 97, targetModelParamId: 97 },
            { productId: 32, runTypeId: 7, inputId: 17, sourceModelParamId: 96, targetModelParamId: 96 },
            { productId: 33, runTypeId: 7, inputId: 1, sourceModelParamId: 106, targetModelParamId: 106 },
            { productId: 33, runTypeId: 7, inputId: 2, sourceModelParamId: 105, targetModelParamId: 111 },
            { productId: 33, runTypeId: 7, inputId: 7, sourceModelParamId: 107, targetModelParamId: 107 },
            { productId: 33, runTypeId: 7, inputId: 8, sourceModelParamId: 108, targetModelParamId: 108 },
            { productId: 33, runTypeId: 7, inputId: 9, sourceModelParamId: 101, targetModelParamId: 101 },
            { productId: 33, runTypeId: 7, inputId: 10, sourceModelParamId: 103, targetModelParamId: 103 },
            { productId: 33, runTypeId: 7, inputId: 11, sourceModelParamId: 102, targetModelParamId: 102 },
            { productId: 33, runTypeId: 7, inputId: 12, sourceModelParamId: 104, targetModelParamId: 104 },
            { productId: 33, runTypeId: 7, inputId: 13, sourceModelParamId: 94, targetModelParamId: 56 },
            { productId: 33, runTypeId: 7, inputId: 14, sourceModelParamId: 93, targetModelParamId: 93 },
            { productId: 33, runTypeId: 7, inputId: 15, sourceModelParamId: 95, targetModelParamId: 95 },
            { productId: 33, runTypeId: 7, inputId: 16, sourceModelParamId: 97, targetModelParamId: 97 },
            { productId: 33, runTypeId: 7, inputId: 1, sourceModelParamId: 96, targetModelParamId: 967 }
        ];
    }
}
