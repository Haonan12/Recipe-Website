import ISubmissionRepository from "./interface";
import Submission from "../../entities/Submission";
import SubmissionModel from "../../models/Submission"

export default class SubmissionRepository implements ISubmissionRepository<Submission> {
  create(item: ISubmissionRepository<Submission>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: ISubmissionRepository<Submission>): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Boolean> {
    throw new Error("Method not implemented.");
  }
  find(item: ISubmissionRepository<Submission>): Promise<ISubmissionRepository<Submission>[]> {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ISubmissionRepository<Submission>> {
    throw new Error("Method not implemented.");
  }
  async findByProgramId(programId) {
    SubmissionModel.find({programId: programId})
      .then((program) => {
        return program;
      })
  }

}
