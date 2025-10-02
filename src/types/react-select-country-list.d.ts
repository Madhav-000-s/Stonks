declare module 'react-select-country-list' {
    export type CountryOption = {
        value: string;
        label: string;
    };

    interface CountryListApi {
        getData: () => CountryOption[];
    }

    function countryList(): CountryListApi;
    export default countryList;
}


