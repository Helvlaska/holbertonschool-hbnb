from app.models.user import User
from app.persistence.repository import SQLAlchemyRepository

class UserRepository(SQLAlchemyRepository):
    def __init__(self):
        super().__init__(User)

    def get_user_by_email(self, email):
        return self.model.query.filter_by(email=email).first()

    def get_admin_users(self):
        """Get all users with admin rights."""
        return self.model.query.filter_by(is_admin=True).all()

    def get_by_id(self, user_id):
        """Retrieve a user by their ID."""
        return self.model.query.get(user_id)

