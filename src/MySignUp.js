import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Auth, I18n } from 'aws-amplify';
import {
    SignUp,
    FormSection,
    SectionHeader,
    SectionBody,
    SectionFooter,
    //FormField,
    InputLabel,
    PhoneField,
    SectionFooterPrimaryContent,
    SectionFooterSecondaryContent,
    Input,
    Button,
    InputRow,
    ButtonRow,
    Link,
} from 'aws-amplify-react';
//--import theme from "./theme";
import { AmplifyTheme } from 'aws-amplify-react';
//--import aws_exports from './aws-exports';
import awsconfig from './aws-exports';
//--Amplify.configure(aws_exports);
Amplify.configure(awsconfig);


export default class MySignUp extends SignUp {

    signUp() {
        const { username, password, email, phone_number, address } = this.inputs;
        const param = {
            username: username,
            password: password,
            attributes:{
                email: email,
            //--    phone_number: phone_number,
            //--    address: address
            }
        }
        alert(awsconfig.aws_user_pools_id);
        Auth.signUp(param)
            .then(() => this.changeState('confirmSignUp', username))
            .catch(err => this.error(err));
    }

	showComponent(theme): React.ReactNode {
		const { hide } = this.props;
		if (hide && hide.includes(SignUp)) {
			return null;
		}
		if (this.checkCustomSignUpFields()) {
			this.signUpFields = this.props.signUpConfig.signUpFields;
		}
		this.sortFields();
		return (
			<FormSection theme={theme} data-test={Auth.signUp.section}>
				<SectionHeader theme={theme} data-test={this.signUp.headerSection}>
					{I18n.get(this.header)}
				</SectionHeader>
				<SectionBody theme={theme} data-test={Auth.signUp.bodySection}>
					{this.signUpFields.map(field => {
						return field.key !== 'phone_number' ? (
							<formfield theme={theme} key={field.key}>
								{field.required ? (
									<InputLabel theme={theme}>
										{I18n.get(field.label)} *
									</InputLabel>
								) : (
									<InputLabel theme={theme}>{I18n.get(field.label)}</InputLabel>
								)}
								<Input
									autoFocus={
										this.signUpFields.findIndex(f => f.key === field.key) === 0
									}
									placeholder={I18n.get(field.placeholder)}
									theme={theme}
									type={field.type}
									name={field.key}
									key={field.key}
									onChange={this.handleInputChange}
									data-test={Auth.signUp.nonPhoneNumberInput}
								/>
							</formfield>
						) : (
							<PhoneField
								theme={theme}
								required={field.required}
								defaultDialCode={this.getDefaultDialCode()}
								label={field.label}
								placeholder={field.placeholder}
								onChangeText={this.onPhoneNumberChanged}
								key="phone_number"
							/>
						);
					})}
				</SectionBody>
				<SectionFooter theme={theme} data-test={Auth.signUp.footerSection}>
					<SectionFooterPrimaryContent theme={theme}>
						<Button
							disabled={this.state.requestPending}
							onClick={this.signUp}
							theme={theme}
							data-test={Auth.signUp.createAccountButton}
						>
							{I18n.get('Create Account')}
						</Button>
					</SectionFooterPrimaryContent>
					<SectionFooterSecondaryContent theme={theme}>
						{I18n.get('Have an account? ')}
						<Link
							theme={theme}
							onClick={() => this.changeState('signIn')}
							data-test={Auth.signUp.signInLink}
						>
							{I18n.get('Sign in')}
						</Link>
					</SectionFooterSecondaryContent>
				</SectionFooter>
			</FormSection>
		);
	}
}
