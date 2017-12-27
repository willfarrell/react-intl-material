import React, {Component} from 'react';

// i18n
import {IntlProvider} from 'react-intl';
import initLocale, {getLocaleMessages} from 'react-intl-locale';

// Containers
import Examples from './containers/Examples';

// Set locale
const defaultLocale = 'en-CA';
const locale = initLocale(defaultLocale, []);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: locale,
            messages: {}
        };
    }

    componentWillMount() {
        getLocaleMessages(this.state.locale, [
            'static/lang/{language}.example.json',
            'static/lang/{language}.country.json',
            'static/lang/{language}.region.json'
        ]).then((messages) => {
            this.setState({messages});
        });
    }

    render() {
        const {locale, messages} = this.state;

        if (!Object.keys(messages).length) return (<div></div>);

        return (
            <IntlProvider
                locale={locale}
                messages={messages}
            >
                <Examples />
            </IntlProvider>
        );
    }
}

export default App;
