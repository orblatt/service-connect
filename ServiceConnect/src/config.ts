export const prices = {
    min: 1,
    max: 1000,
    defaultMinPrice: 300,
    defaultMaxPrice: 600,
    step: 1
};

export const defaultCityPlaceholder: string = 'City';
export const duration = {
    min: 1,
    max: 9,
    defaultMin: 3,
    defaultMax: 6,
    defaultExact: 3,
    step: 1
}

export const defaultJobAd = {
    price: prices.defaultMinPrice,
    address: 'Tel Aviv',
    duration: duration.defaultExact,
    youngestChildAge: 2,
    toolsProvided: true,
    numberOfRooms: 3.5
};

export const cityOptions = ['Tel Aviv', 'Ramat Gan', 'Petah Tikva'] as const;



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
export const defaultMinPrice: string = '1';
export const defaultMaxPrice: string = '99999';
export const defaultSearchProfile: any = {
    interval: 'Minutely'
};
export const routes: any = {
    home: '/',
    providerHome: '/provider-homepage',
    customerHome: '/customer-homepage',
    createJobAd: '/create-job-ad',
    searchJobAds: '/search-job-ads',
    test: '/test',
    myJobAds: "/my-job-ads",
    settings: "/settings",
    myJobs: "/my-jobs",
};

export const jobImages = {
    defaultCategory: { alt: '', src: ''},
    'Babysitting': { alt: 'Babysitting', src: 'https://images.unsplash.com/photo-1713942589571-c19b1a7a14e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    'House Keeping': { alt: 'House Keeping', src: 'https://images.unsplash.com/photo-1574320200632-4e123899b003?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    'Gardening': { alt: 'Gardening', src: 'https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
};

export const jobCategories = ['Babysitting', 'House Keeping', 'Gardening'] as const;
export type JobCategory = typeof jobCategories[number];

export const defaultInterval: string = 'Interval';
export const defaultIntervals = ['Weekly', 'Daily', 'Hourly', 'Minutely'] as const;
export type Interval = typeof defaultIntervals[number];