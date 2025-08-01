from functools import wraps
from flask import jsonify
from jwt.exceptions import ExpiredSignatureError
import traceback

def handle_errors(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except ExpiredSignatureError:
            print("⚠️ Token JWT expiré")
            return jsonify({"message": "Token has expired"}), 401

        except ValueError as e:
            print("❌ ValueError attrapée :", e)
            if 'not found' in str(e).lower():
                return jsonify({'error': str(e)}), 404
            return jsonify({'error': str(e)}), 400

        except TypeError as e:
            print("❌ TypeError attrapée :", e)
            return jsonify({'error': str(e)}), 400

        except Exception as e:
            print("💥 Erreur inattendue :", e)
            traceback.print_exc()
            return jsonify({'error': f'Unexpected error: {str(e)}'}) , 400

    return decorated
