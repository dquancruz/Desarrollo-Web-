# 🎓 FormularioEstudiante

React Native student enrollment form for Android, built as exam practice. It extends the pattern of [FormularioEmpleado](../FormularioEmpleado/) with more control types: radio buttons, checkboxes and switches.

**Stack:** React Native 0.87 · React 19 · TypeScript · `@react-native-community/datetimepicker` · `@react-native-picker/picker` · Jest

## ✨ What it does

`App.tsx` renders a `FormularioEstudiante` screen ("Inscripción de Estudiante"):

| Field | Input |
|-------|-------|
| Nombre completo | text |
| Carnet | text, numeric keyboard |
| Correo | text, email keyboard, regex validation |
| Teléfono | phone keyboard, max 8 digits, length validation |
| Fecha de nacimiento | date picker, shown as `dd/mm/yyyy` |
| Carrera | dropdown (`Picker`) |
| Jornada | radio buttons (single choice) |
| Intereses | checkboxes (multiple choice) |
| ¿Solicita beca? | `Switch` |
| Acepto los términos | `Switch`, required |

"Inscribirme" validates (empty fields, email format, phone length, terms accepted) and shows an `Alert` summary; accepting it clears the form. "Limpiar" resets all fields.

**Concepts covered:** `useState` (string, boolean, `Date | null`, `string[]`), toggling items in an array, validation with early `return`, `Picker`, `DateTimePicker`, `Switch`, custom radio/checkbox with `TouchableOpacity`, `Alert` with buttons, `ScrollView`, `StyleSheet`.

## 🚀 Getting Started

> Requires the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) (Node, JDK, Android Studio).

```bash
npm install
npm start          # Metro bundler
npm run android    # in another terminal, with an emulator or device running
```
