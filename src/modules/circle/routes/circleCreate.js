import React, { Component } from 'react'
import { withRouter } from 'react-router'
import {
  List,
  WhiteSpace,
  WingBlank,
  Toast,
  Flex,
  Button,
  Popup,
  InputItem,
  ImagePicker,
  TextareaItem
} from 'antd-mobile';
import { Img } from 'commonComponent';
import { createForm } from 'rc-form';
import * as circleApi from '../api/circle';

import './circle.less';
const Item = List.Item;

class PopupContent extends React.Component {
  onSel = (sel) => {
    this.props.onSelect(sel);
    this.props.onClose();
  };

  render() {
    return (
      <List>
        {
          this.props.circleTypeList.map(item => {
            return <List.Item key={item.circleClassId}
              onClick={() => { this.onSel(item); }}
            >{item.circleClassName}</List.Item>
          })
        }
      </List>
    );
  }
}

class CircleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleTypeList: [],
      selectedType: null,
      files: [],
    }
  }

  componentDidMount() {
    circleApi.circleType().then(result => {
      this.setState({
        circleTypeList: result.data
      })
    })
  }

  selectType = (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    Popup.show(<PopupContent
      circleTypeList={this.state.circleTypeList}
      onSelect={(selectedType) => {
        this.setState({
          selectedType
        })
      }}
      onClose={() => Popup.hide()} />);
  }

  onChange = (files, type, index) => {
    this.setState({
      files,
    });
  }

  submit = () => {
    const fieldsValue = this.props.form.getFieldsValue();
    if (!this.state.selectedType) {
      Toast.info('请选择圈子类型');
      return;
    }
    const circleClassId = this.state.selectedType.circleClassId
    if (!fieldsValue.circleName || fieldsValue.circleClassName == '') {
      Toast.info('请输入圈子名称');
      return;
    }
		if (fieldsValue.circleName.length>10) {
      Toast.info('圈子名称最多10个字符');
      return;
    }
    if (!fieldsValue.circleDescription || fieldsValue.circleDescription == '') {
      Toast.info('请输入圈子描述');
      return;
    }
		if (15>fieldsValue.circleDescription.length||256<fieldsValue.circleDescription.length) {
      Toast.info('圈子描述在15-255个字符范围内');
      return;
    }
    if (this.state.files.length == 0) {
      Toast.info('请上传圈子图片');
      return;
    }

    circleApi.filesUpload({
      images: this.state.files.map(item => item.file)
    }).then(result => {
      // 上传图片成功
      if (result.result == 1) {
        const imgUrl = result.data;
        circleApi.addcircle({
          circleClassId,
          circleName: fieldsValue.circleName,
          circleDescription: fieldsValue.circleDescription,
          circlePhoto: imgUrl
        }).then(r => {
          if (r.result != 1) {
            Toast.error(r.msg);
            return;
          }
          this.props.router.goBack();
        });
      }
    });
  }

  gotoCircleDetail = (circle) => {
    this.props.router.push('/circleDetail/' + circle.circleId)
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { selectedType, files } = this.state;
    const circleClassName = selectedType ? selectedType.circleClassName : ''
    return (
      <List>
        <InputItem onClick={this.selectType} value={circleClassName} editable={false}>请选择分类</InputItem>
        <InputItem
          {...getFieldProps('circleName') }
          placeholder="圈子名称用1-10个字符">圈子名称</InputItem>
        <TextareaItem
            {...getFieldProps('circleDescription') }
            title="圈子简介"
            placeholder="使用15-255个字符"
            rows={5}
        />
        <Item>
          圈子图标:
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 1}
          />
        </Item>

        <Item>
          <Button type='primary' onClick={this.submit}>创建</Button>
        </Item>
      </List>
    )
  }
}

export default withRouter(createForm()(CircleCreate));
