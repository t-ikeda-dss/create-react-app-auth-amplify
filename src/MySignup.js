import React from 'react';

import { Auth, I18n } from 'aws-amplify';
import {
    SignUp,
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    InputRow,
    ButtonRow,
    Link,
} from 'aws-amplify-react';


export default class MySignUp extends SignUp {

    signUp() {
        const { username, password, email, phone_number, address } = this.inputs;
        const param = {
            username: username,
            password: password,
            attributes:{
                email: email,
                phone_number: phone_number,
                address: address
            }
        }
        Auth.signUp(param)
            .then(() => this.changeState('confirmSignUp', username))
            .catch(err => this.error(err));
    }
    
    showComponent(theme) {
        const { hide } = this.props;
        if (hide && hide.includes(SignUp)) { return null; }

        return (
            <FormSection theme={theme}>
                <SectionHeader theme={theme}>{I18n.get('Sign Up Account')}</SectionHeader>
                <SectionBody theme={theme}>
                <InputRow
                        autoFocus
                        placeholder={I18n.get('Username')}
                        theme={theme}
                        key="username"
                        name="username"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('Password')}
                        theme={theme}
                        type="password"
                        key="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('Email')}
                        theme={theme}
                        key="email"
                        name="email"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('Phone Number')}
                        theme={theme}
                        key="phone_number"
                        name="phone_number"
                        onChange={this.handleInputChange}
                    />
                    <InputRow
                        placeholder={I18n.get('address')}
                        theme={theme}
                        key="address"
                        name="address"
                        onChange={this.handleInputChange}
                    />
                    <ButtonRow onClick={this.signUp} theme={theme}>
                        {I18n.get('Sign Up')}
                    </ButtonRow>
                </SectionBody>
                <SectionFooter theme={theme}>
                    <div style={theme.col6}>
                        <Link theme={theme} onClick={() => this.changeState('confirmSignUp')}>
                            {I18n.get('Confirm a Code')}
                        </Link>
                    </div>
                    <div style={Object.assign({textAlign: 'right'}, theme.col6)}>
                        <Link theme={theme} onClick={() => this.changeState('signIn')}>
                            {I18n.get('Sign In')}
                        </Link>
                    </div>
                </SectionFooter>
            </FormSection>
        )
    }
}