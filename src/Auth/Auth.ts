    /**
     * Sign up with username, password and other attrbutes like phone, email
     * @param {String | object} params - The user attirbutes used for signin
     * @param {String[]} restOfAttrs - for the backward compatability
     * @return - A promise resolves callback data if success
     */
    public signUp(params: string | object, ...restOfAttrs: string[]): Promise<any> {
        if (!this.userPool) { return Promise.reject('No userPool'); }

        let username : string = null;
        let password : string = null;
        const attributes : object[] = [];
        let validationData: object[] = null;
        if (params && typeof params === 'string') {
            username = params;
            password = restOfAttrs? restOfAttrs[0] : null;
            const email : string = restOfAttrs? restOfAttrs[1] : null;
            const phone_number : string = restOfAttrs? restOfAttrs[2] : null;
            if (email) attributes.push({Name: 'email', Value: email});
            if (phone_number) attributes.push({Name: 'phone_number', Value: phone_number});
        } else if (params && typeof params === 'object') {
            username = params['username'];
            password = params['password'];
            const attrs = params['attributes'];
            if (attrs) {
                Object.keys(attrs).map(key => {
                    const ele : object = { Name: key, Value: attrs[key] };
                    attributes.push(ele);
                });
            }
            validationData = params['validationData'] || null;
        } else {
            return Promise.reject('The first parameter should either be non-null string or object');
        }

        if (!username) { return Promise.reject('Username cannot be empty'); }
        if (!password) { return Promise.reject('Password cannot be empty'); }

        logger.debug('signUp attrs:', attributes);
        logger.debug('signUp validation data:', validationData);

        return new Promise((resolve, reject) => {
            this.userPool.signUp(username, password, attributes, validationData, function(err, data) {
                if (err) {
                    dispatchAuthEvent('signUp_failure', err);
                    reject(err);
                } else {
                    dispatchAuthEvent('signUp', data);
                    resolve(data);
                }
            });
        });
    }
    
