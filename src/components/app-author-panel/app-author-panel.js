import React, {Component} from "react";
import "./app-author-panel.css"


export default class Auth extends Component {
    constructor(){
        super();
        this.state = {
            name:null,
            password:null,
            focusName:false,
            focusPass:false
        }
        this.handleclick=(event)=>{//отправка формы
            event.preventDefault();
            const{updateStorage, updateLoader, getOfStorage, setDataStorage} = this.props;
            this.setState(({name, password})=>{
                const isvalid=val=>val === null?false:val
                if(isvalid(name)!==false && isvalid(password)!==false){
                    updateLoader(true);
                    updateStorage({name, password}, getOfStorage(`tasks_${name}`));
                    setDataStorage("User",{name, password})
                }//если оба поля заполнены и валидны
                return({
                    name:isvalid(name),
                    password:isvalid(password)
                })
            })
        }
        this.handlefocus=event => {//фокус на поле
            switch (event.target.name) {
                case "name":
                    this.setState({
                        focusName: true
                    })
                    break;
                case "password":
                    this.setState({
                        focusPass: true
                    })
                    break;
                default:
                    break;
            }
        }
        this.handleblur=event => { ///если фокусе на другой элемент
            const element=event.target;
            const value=element.value;
            const validate=(value,valLength)=>(value.length>0)?(value.length>=valLength)?value:false:null;
            switch (element.name) {
                case "name":
                    this.setState({
                        name: validate(value.trim(),4),
                        focusName: false
                    })
                    break;
                case "password":
                    this.setState({
                        password: validate(value.trim(), 3),
                        focusPass: false
                    })
                    break;
                default:
                    break;
            }
        }
    }

    render=()=>{
        const{name, password, focusName, focusPass} = this.state;
        const ifError = (label, focus) => (label===false && focus===false) ? "alert-validate" : (label!==false && label!==null)&&"valid";
        const alertName = ifError(name, focusName);
        const alertPass = ifError(password, focusPass);
        
        return(
            <form className="login100-form validate-form">
                <span className="login100-form-title p-b-33">
                    Account Login
                </span>

                <div className={`wrap-input100 validate-input ${alertName}`} data-validate = "Your name isn't correct">
                    <input className="input100" type="text" onBlur={this.handleblur} onFocus={this.handlefocus} name="name" placeholder="Your name" />
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>

                <div className={`wrap-input100 validate-input ${alertPass}`} data-validate="Password isn't correct">
                    <input className="input100" type="password" onBlur={this.handleblur} onFocus={this.handlefocus} name="password"  placeholder="Password" autoComplete="off"/>
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>

                <div className="container-login100-form-btn m-t-20">
                    <button className="login100-form-btn" onClick={this.handleclick}>
                        Sign in
                    </button>
                </div>

                <div className="text-center p-t-45 p-b-4">
                    <span className="txt1">
                        Forgot
                    </span>

                </div>
                <div className="text-center">
                    <span className="txt1">
                        Create an account?
                    </span>
                </div>
            </form>
        
                
           
        )
    }
}

