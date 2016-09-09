/* eslint camelcase: "off" */

const Promise = require('bluebird');
const $ = require('jquery');
const React = require('react');
const g = require('../../globals');
const ui = require('../../ui');
const bbgmViewReact = require('../../util/bbgmViewReact');

const ajaxErrorMsg = "Error connecting to server. Check your Internet connection or try again later.";

class AccountUpdateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            formError: null,
            number: '',
            cvc: '',
            exp_month: '',
            exp_year: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (!window.Stripe) {
            await Promise.resolve($.getScript('https://js.stripe.com/v2/'));
            window.Stripe.setPublishableKey(g.stripePublishableKey);
        }

        this.setState({
            disabled: false,
        });
    }

    handleChange(name, e) {
        this.setState({
            [name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            disabled: true,
        });

        window.Stripe.card.createToken({
            number: this.state.number,
            cvc: this.state.cvc,
            exp_month: this.state.exp_month,
            exp_year: this.state.exp_year,
        }, async (status, response) => {
            if (response.error) {
                this.setState({
                    disabled: false,
                    formError: response.error.message,
                });
            } else {
                const token = response.id;

                try {
                    const data = await Promise.resolve($.ajax({
                        type: "POST",
                        url: `//account.basketball-gm.${g.tld}/gold_card_update.php`,
                        data: {
                            sport: "basketball",
                            token,
                        },
                        dataType: "json",
                        xhrFields: {
                            withCredentials: true,
                        },
                    }));
                    ui.realtimeUpdate(["account"], "/account", undefined, {goldResult: data});
                } catch (err) {
                    console.log(err);
                    this.setState({
                        disabled: false,
                        formError: ajaxErrorMsg,
                    });
                }
            }
        });
    }

    render() {
        const {goldCancelled, expMonth, expYear, last4, username} = this.props;

        bbgmViewReact.title('Update Card');

        let errorMessage;
        if (username === null || username === '') {
            errorMessage = 'Log in to view this page.';
        }
        if (goldCancelled) {
            errorMessage = 'Cannot update card because your Basketball GM Gold account is cancelled.';
        }
        if (errorMessage) {
            return <div>
                <h1>Error</h1>
                <p>{errorMessage}</p>
            </div>;
        }

        return <div>
            <h1>Update Card</h1>

            <h3>Saved Card Info</h3>
            <p>
                Last 4 Digits: {last4}<br />
                Expiration: {expMonth}/{expYear}
            </p>

            <hr />

            <p>To replace your saved card with a new one, fill out this form:</p>

            <form onSubmit={this.handleSubmit} data-no-davis="true">
                {this.state.formError ? <div className="alert alert-danger">{this.state.formError}</div> : null}

                <div style={{maxWidth: '300px'}}>
                    <div className="form-group">
                        <label htmlFor="card-number">Card Number</label>
                        <input type="text" onChange={this.handleChange.bind(this, 'number')} value={this.state.number} id="card-number" className="form-control" />
                    </div>

                    <div className="form-group" style={{maxWidth: '100px'}}>
                        <label htmlFor="cvc">CVC</label>
                        <input type="text" onChange={this.handleChange.bind(this, 'cvc')} value={this.state.cvc} id="cvc" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exp-month">Expiration (MM/YYYY)</label>
                        <div className="row">
                            <div className="col-xs-5">
                                <input type="text" onChange={this.handleChange.bind(this, 'exp_month')} value={this.state.exp_month} placeholder="MM" id="exp-month" className="form-control" />
                            </div>
                            <div className="col-xs-7">
                                <input type="text" onChange={this.handleChange.bind(this, 'exp_year')} value={this.state.exp_year} placeholder="YYYY" className="form-control" />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={this.state.disabled} className="btn btn-primary">
                        Update Card
                    </button>
                </div>
            </form>
        </div>;
    }
}

module.exports = AccountUpdateCard;
