import { ProfileModel } from "../models/profile";

export type ProfileField = {
  label: string;
  key: keyof ProfileModel;
};

export const profileFields: ProfileField[] = [
        { label: "Nom d'utilisateur", key: "username" },
        { label: "Numéro de téléphone", key: "phone_number" },
        { label: "Sexe", key: "gender" },
        { label: "Âge", key: "age" },
];