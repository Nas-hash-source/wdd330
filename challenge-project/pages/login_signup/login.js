class Login {
    
    render() {
        return (`
                <label for="signin-email">Email</label>
                <input type="email" name="signin-email" id="signin-email">
                <label for="signin-password">Password</label>
                <input type="password" name="signin-password" id="signin-password"></input>
                <p>Accept <a href="http://" target="_blank" rel="noopener noreferrer">the terms and the policies</a>
                by hitting the log in button</p>
                <button>Log in</button>
                <a href="http://">Forget password?</a>
            `
        );
    }
}