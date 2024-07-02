export const prices = {
    min: 0,
    max: 1000,
    defaultMinPrice: 100,
    defaultMaxPrice: 500,
    step: 1
};

export const defaultCityPlaceholder: string = 'Select City';
export const defaultJobAd = {
    price: prices.defaultMinPrice,
    address: 'Tel Aviv',
    duration: 3,
    youngestChildAge: 2,
    toolsProvided: true,
    numberOfRooms: 3.5
};

export const duration = {
    min: 1,
    max: 9,
}

export const youngestChildAge = {
    min: 1,
    max: 10,
}

export const rooms = {
    min: 1,
    max: 10,
    step: 0.5
}

export const defaultCategory: string = 'Category';
export const defaultMinPrice: string = '0';
export const defaultMaxPrice: string = '99999';
export const defaultSearchProfile: any = {
    interval: 'minutely'
};
export const routes: any = {
    home: '/',
    createJobAd: '/create-job-ad',
    searchJobAds: '/search-job-ads',
    test: '/test',
    myJobAds: "/my-job-ads"
};

export const jobCategories = ['Babysitting', 'House Keeping', 'Gardening'] as const;
export type JobCategory = typeof jobCategories[number];

export const defaultIntervals = ['weekly', 'daily', 'hourly', 'minutely'] as const;
export type Interval = typeof defaultIntervals[number];