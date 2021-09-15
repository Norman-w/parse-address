import React, {Component} from 'react';
import  classNames from './App.module.css'
import {Input, message, notification} from 'antd';
import 'antd/dist/antd.css';

const {Search} =  Input;

class App extends Component {
  state=
    {
      waitParseAddress:''
    }
    onChange(e)
    {
      console.log(e.target.value)
      this.setState({waitParseAddress:e.target.value});
    }
  async onSearch()
  {
    // message.warn('请联系管理员')
    let url = "https://www.enni.group/top/parseaddress.aspx?address="+encodeURIComponent(this.state.waitParseAddress)
    + '&who=66da3d85bc73&t='+new Date().getDate();
    let f = fetch(url);
    let fret = null;
    try{
      fret = (await f).json();
      fret = (await fret);
    }
    catch (fretErr)
    {
      message.error('发生请求错误');
    }
    if (!fret)
    {
      message.error('错误的请求返回');
    }
    else
    {
      notification.info(
        {
          message: '解析结果:',
          description: JSON.stringify(fret),
          // description:'哈哈哈',
          placement: 'bottom',
        }
      )
      message.success('解析完成,结构化信息已为您输出到浏览器控制台');
      console.log('%c恭喜,解析成功,结果为:',"color:green;font-size:20px",fret);
    }
  }
  render() {
    return (
      <div className={classNames.main}>
        <div className={classNames.back}></div>
        <div className={classNames.titleLine}>
          <div className={classNames.title}>
            Address auto parser of China
          </div>
          <div className={classNames.subTitle}>
            Developed by Enni-EC
          </div>
        </div>
        <div className={classNames.queryLine}>
          <Search
            placeholder="输入地址以解析... Input address and click search button to parse..."
            value={this.state.waitParseAddress}
            onChange={this.onChange.bind(this)}
            allowClear
            enterButton="Parse 解析 "
            size="large"
            onSearch={this.onSearch.bind(this)}
          />
        </div>
        <div className={classNames.descLine}>
          <div>中文地址自动解析,适合餐饮APP,物流APP,用户注册,快递打单,信息收录,微商等</div>
          <div>一切需需要使用到地址的应用场景.毫秒级响应,自动过滤关键字,自动补全</div>
          <div>使用成本低,对接简单,其智能识别效率为行业标杆,且全网首发,欢迎您的使用</div>
        </div>
        <div className={classNames.icpLine}>
          冀ICP备14013929号
        </div>
      </div>
    );
  }
}

export default App;
