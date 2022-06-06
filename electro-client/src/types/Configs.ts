import { TitleLink } from 'types/TitleLink';
import { EntityPropertyNames } from 'types/EntityProperty';

export abstract class Configs {
  static managerPath: string;
  static resourceUrl: string;
  static createTitle: string;
  static updateTitle: string;
  static manageTitle: string;
  static manageTitleLinks: TitleLink[];
  static properties: EntityPropertyNames;
  static initialCreateUpdateFormValues: object;
  static createUpdateFormSchema: object;
}
