import React, { Component } from 'react';
import './OTP.css'
class OTPInput extends Component {
    handleInput = (e) => {
        const target = e.target;
        const maxLength = parseInt(target.getAttribute('maxlength'));
        const length = target.value.length;
        
        if (length >= maxLength) {
            const next = target.nextElementSibling;

            if (next && next.tagName.toLowerCase() === "input") {
                next.focus();
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Enter OTP</h1>
                <div id="otp-container">
                    <input type="text" className="otp-input" maxLength="1" onInput={this.handleInput} />
                    <input type="text" className="otp-input" maxLength="1" onInput={this.handleInput} />
                    <input type="text" className="otp-input" maxLength="1" onInput={this.handleInput} />
                    <input type="text" className="otp-input" maxLength="1" onInput={this.handleInput} />
                </div>
            </div>
        );
    }
}

export default OTPInput;
