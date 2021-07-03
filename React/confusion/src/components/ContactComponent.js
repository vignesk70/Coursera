import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

class FormSubmit extends Component {
  constructor(props) {
    super(props);
    this.minlength=3;
    this.maxlength=15;
    console.log("Props",props)
  }

render(){
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        telnum: "",
        email: "",
        agree: false,
        contactType: "Tel.",
        message: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.firstname) {
          errors.firstname = "First Name is Required";
        } else if (values.firstname.length < this.minlength) {
          errors.firstname =
            "Must be greater than " + (this.minlength - 1) + " characters";
        } else if (values.firstname.length > this.maxlength) {
          errors.firstname = "Must be less than " + this.maxlength + " characters";
        }
        if (!values.lastname) {
          errors.lastname = "Last name is required";
        } else if (values.lastname.length < this.minlength) {
          errors.lastname = "Must be greater than " + (this.minlength - 1) + " characters";
        } else if (values.lastname.length > this.maxlength) {
          errors.lastname = "Must be less than " + this.maxlength + " characters";
        }
        if (!values.telnum) {
          errors.telnum = " Telephone number is required";
        } else if (isNaN(values.telnum)) {
          errors.telnum = " Please put numbers only";
        }
        if (!values.email) {
          errors.email = " Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
        //this.handleSubmit(values)
        this.props.postFeedback(
          values.firstname,
          values.lastname, values.telnum, values.email,values.agree,values.contactType,values.message
        )

      }}


    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            {" "}
            <Label htmlFor="firstname" md={2}>
              First Name
            </Label>
            <Col sm={10}>
              <Field type="text" name="firstname" />
              <ErrorMessage
                className="text-danger"
                name="firstname"
                component="div"
              />
            </Col>
          </Row>
          <Row>
            {" "}
            <Label htmlFor="lastname" md={2}>
              Last Name
            </Label>
            <Col sm={10}>
              <Field type="text" name="lastname" />
              <ErrorMessage
                className="text-danger"
                name="lastname"
                component="div"
              />{" "}
            </Col>
          </Row>
          <Row>
            {" "}
            <Label htmlFor="telnum" md={2}>
              Tel. Number
            </Label>
            <Col sm={10}>
              <Field type="text" name="telnum" />
              <ErrorMessage
                className="text-danger"
                name="telnum"
                component="div"
              />{" "}
            </Col>
          </Row>
          <Row>
            {" "}
            <Label htmlFor="telnum" md={2}>
              Email
            </Label>
            <Col sm={10}>
              <Field type="email" name="email" />
              <ErrorMessage
                className="text-danger"
                name="email"
                component="div"
              />{" "}
            </Col>
          </Row>
          <Row>
            {" "}
            <Label htmlFor="telnum" md={2}>
              May we contact you?
            </Label>
            <Col sm={2}>
              <Field type="checkbox" name="agree" />
              <ErrorMessage
                className="text-danger"
                name="agree"
                component="div"
              />{" "}
            </Col>
            <Col sm={10}>
              <Field as="select" name="contactType">
                <option value="Tel.">Tel</option>
                <option value="Email">Email</option>
              </Field>
            </Col>
          </Row>
          <Row>
            {" "}
            <Label htmlFor="message" md={2}>
              Feedback
            </Label>
            <Col md={{ size: 10, offset: 2 }}>
              <Field type="textarea" rows="12" name="message" />
              <ErrorMessage
                className="text-danger"
                name="message"
                component="div"
              />{" "}
            </Col>
          </Row>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );}
}

class Contact extends Component {
constructor(props) {
  super(props);
}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a
                role="button"
                className="btn btn-info"
                href="skype:+85212345678"
              >
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your feedback</h3>
          </div>
          <div className="col-12 col-md-9">
            <FormSubmit  postFeedback={this.props.postFeedback}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
