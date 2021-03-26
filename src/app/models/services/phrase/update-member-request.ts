export class UpdateMemberRequest {

  constructor(memberId: string, firstName: string, lastName: string, picture: string) {
    this.memberId = memberId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
  }
  memberId: string;
  firstName: string;
  lastName: string;
  picture: string;
}
