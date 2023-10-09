import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Service } from 'src/servicegeneric/servicegeneric.service';
import { Role, RoleSchema } from './entities/role.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoleService extends Service<Role ,CreateRoleDto>{
  constructor(

    @InjectModel(Role.name) readonly roleModel: Model<Role>
  ) {
    super(roleModel);
  }
}
