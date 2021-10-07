import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

import Login from "../pages/Login"

test('Login validation', () => {
	// Render a checkbox with label in the document
	const form = shallow(<Login />);
 
	form.find('.input-login').simulate('blur',  { target: { name: "login", value: "12" } });
	expect(form.find('.input-login').hasClass("is-invalid")).toBe(true)
	expect(form.find('.input-login').hasClass("is-valid")).toBe(false)


	form.find('.input-login').simulate('blur',  { target: { name: "login", value: "lajdfho874hrjadhflryqiorhqioruqo8qwuerhfajfhl!@#$@O(&($&*^@&*&@$" } });
	expect(form.find('.input-login').hasClass("is-invalid")).toBe(true)
	expect(form.find('.input-login').hasClass("is-valid")).toBe(false)

	form.find('.input-login').simulate('blur',  { target: { name: "login", value: "daniil00t" } });
	expect(form.find('.input-login').hasClass("is-invalid")).toBe(false)
	expect(form.find('.input-login').hasClass("is-valid")).toBe(true)

 });

 test('password validation', () => {
	// Render a checkbox with label in the document
	const form = shallow(<Login />);
 
	// form.find('.input-login').simulate('blur',  { target: { name: "login1", value: "12345" }});
	expect(false)

 });