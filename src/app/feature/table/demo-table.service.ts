import { Injectable } from '@angular/core';
import { InputDto } from './entitites/input.dto';
import { ProductDto } from './entitites/product.dto';

@Injectable({ providedIn: 'root' })
export class DemoTableService {
    constructor() {}

    getProduct(): ProductDto[] {
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

    getInput(): InputDto[] {
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
}
