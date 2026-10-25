# 🧑‍💼 FormularioEmpleado

React Native employee registration form: eight fields, a native date picker, and a department dropdown. It builds on [FirstMobileApp](../FirstMobileApp/).

**Stack:** React Native 0.87 · React 19 · TypeScript · `@react-native-community/datetimepicker` · `@react-native-picker/picker` · Jest

## ✨ What it does

`App.tsx` renders a `FormularioEmpleado` screen ("Registro de Empleado") with a header and a card of fields:

| Field | Input |
|-------|-------|
| Nombre, Apellido | text |
| Correo | text, email keyboard |
| Teléfono | text, phone keyboard |
| DPI | text |
| Dirección | text |
| Fecha de nacimiento | date picker, shown as `dd/mm/yyyy` |
| Departamento | dropdown (Guatemala, Quetzaltenango, Huehuetenango, Escuintla, Alta Verapaz, Petén) |

Pressing the submit button shows an `Alert`: an error if any field is empty, otherwise a summary of all the data.

**Concepts covered:** `useState`, reusable field helper, `Picker`, `DateTimePicker`, `Alert`, `ScrollView`, `StyleSheet`.

## 🚀 Getting Started

> Requires the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) (Node, JDK, Android Studio).

```bash
npm install
npm start            # Metro dev server
npm run android      # build and run on an Android emulator/device
npm test             # Jest
```
