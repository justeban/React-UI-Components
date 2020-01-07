import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import PasswordStrengthMeter from '../components/passwordStrengthMeter/passwordStrengthMeter';

export default {
    title: "Password Strength Meter",
    decorators: [withKnobs],
};

export const _default = () => {
    const initialProps = object('props', {
      rules: {
        "At Least One Capital Letter": {
          regex: "[A-Z]"
        },
        "At Least One Number": {
          regex: "\\d"
        },
        "A Special Character, like !,?,@, etc": {
          regex: "[!@#\\$%\\^\\&*\\)\\(+=._-]+"
        }
      }
    });
    return <PasswordStrengthMeter config={initialProps} />;
}
